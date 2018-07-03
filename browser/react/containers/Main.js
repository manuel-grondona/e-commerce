import React from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import Appbar from '../components/Appbar'
import Products from '../components/Products'
import SidebarContainer from './SidebarContainer'
import { Grid } from '@material-ui/core'
import SingleProduct from '../components/SingleProduct'
import CrearUsuario from './CrearUsuario'
import Cart from './CarroContainer'

export default class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            search: "",
            products: [],


        }
        this.setSearch = this.setSearch.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    setSearch(e) {
        console.log(this.state.search)
        this.setState({ search: e.target.value })


    }

    handleSubmit(e) {
        e.preventDefault()

        this.setState({ products: ["heladera 1", "heladera 2", "heladera 3"] })
        console.log(this.state.products)
        //     axios.get()
        //         .then((result) => {

        //             this.setState({
        //                 products: [],
        //                 search: ""
        //             })
        //             this.props.history.push('/search');
        //         });
    }


    render() {
      if (this.props.location.pathname === '/cart'){
        return (
          <div>
            <Appbar setSearch={this.setSearch} search={this.state.search} handleSubmit={this.handleSubmit} />
            <Route
                exact path='/cart' render={() =>
                    <Cart />
                } />
            <br />
          </div>
        )
      }else{
        return (
            <div>
                <Appbar setSearch={this.setSearch} search={this.state.search} handleSubmit={this.handleSubmit} />
                <br />
                <Grid container spacing={16}>
                    <Grid item xs={2}>
                        <SidebarContainer />
                    </Grid>
                    <Grid item xs={10}>
                        <Switch>
                            <Route
                                exact path='/products' render={() =>
                                    <Products />
                                } />
                            <Route
                                exact path='/products/reptil' render={() =>
                                    <SingleProduct />
                                } />
                            <Route
                                exact path='/accounts/new' render={() =>
                                    <CrearUsuario />
                                } />
                            <Redirect from="/" to="/products" />
                        </Switch>
                    </Grid>
                </Grid>
            </div>
        )
    }
  }
}
