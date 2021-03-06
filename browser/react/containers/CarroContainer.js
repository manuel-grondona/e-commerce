import React from 'react';
import store from '../store'
import { fetchItemsInCart, updateItemInCart } from '../action-creators/carrito'
import Carro from '../components/Carro';
import InputDataToGenOrder from '../components/data_for_gen_order';
import axios from 'axios';

import { Grid } from '@material-ui/core'

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

class CarroContainer extends React.Component{
  constructor(props){
    super(props);
    //this.state = store.getState();
    this.state = {
      data: store.getState(),
      total: 0,
      email: '',
      address: '',
      userId: store.getState().users.loggedUser.id,
      emailFlag: false
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubstract = this.handleSubstract.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.sumaTotal = this.sumaTotal.bind(this);
    this.genOrder = this.genOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  sumaTotal(){
    let total = 0;
    let data_length = this.state.data.carrito.list_items.length;
    for (let i=0; i < data_length; i++){
      total = total + (this.state.data.carrito.list_items[i]['carrito']['cantidad'] * this.state.data.carrito.list_items[i]['precio']);
    }
    return total;
  }

  componentDidMount(){
      this.unsubscribe = store.subscribe(() => {
          this.setState({
            data: store.getState(), userId: store.getState().users.loggedUser.id
          });
      })
      if (this.state.userId) store.dispatch(fetchItemsInCart(this.state.userId));
  }

  handleAdd = itemId => event => { // debo llamar la ruta para actualizar un item en carrito
    store.dispatch(updateItemInCart('increment', this.state.userId, itemId));

  }

  handleSubstract = itemId => event => { // debo llamar la ruta para actualizar un item en carrito
    store.dispatch(updateItemInCart('decrement', this.state.userId, itemId));

  }

  handleDrop = itemId => event => { // debo llamar la ruta para actualizar un item en carrito
    axios.delete('/api/carrito/delete', {data: {itemId: itemId, userId: this.state.userId} })
    .then(res => store.dispatch(fetchItemsInCart(this.state.userId)));
  }

  handleChange = event => {
    const string = event.target.value;
    const key = event.target.id;
    if (key === 'input-email'){
      this.setState({emailFlag: validateEmail(string), email: string});
    }else{
      this.setState({address: string});
    }
  }

  genOrder = event => {
    let suma = this.sumaTotal();
    let items_array = this.state.data.carrito.list_items.map(item => ({
      id: item.carrito.productoId,
      cantidad: item.carrito.cantidad,
      precio: item.precio
    }));
    axios.post('/api/orders', {
      userId: this.state.userId,
      total: suma,
      email: this.state.email,
      address: this.state.address,
      items: items_array
    })
    .then(ordenCreated => console.log('Orden Creada : ', ordenCreated))
    .catch(err => console.log('Error : ', err));
  }

  componentWillUnmount() {
      this.unsubscribe();
  }

  render(){
    if (this.state.data.carrito.list_items.length === 0){
      return (
        <div>
          <h1>CARRO VACIO</h1>
        </div>
      )
    }
    return (
      <div>
        <Carro data={this.state.data.carrito.list_items} address={this.state.address} sumaTotal={this.sumaTotal} total={this.state.total} handleAdd={this.handleAdd} handleSubstract={this.handleSubstract} handleDrop={this.handleDrop} genOrder={this.genOrder} emailFlag={this.state.emailFlag}/>
        <InputDataToGenOrder handleChange={this.handleChange} emailFlag={this.state.emailFlag}/>
      </div>
    );
  }
}

export default CarroContainer;
