import React from 'react';
import Appbar from '../components/Appbar'
import Products from '../components/Products'
import SidebarContainer from './SidebarContainer'
import { Grid } from '@material-ui/core'

export default class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            search: "",
            products: []

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
        return (
            <div>
                <Appbar setSearch={this.setSearch} search={this.state.search} handleSubmit={this.handleSubmit}/>
            
            <br />
            <Grid container spacing={16}>
                <Grid item xs={2}>
                    <SidebarContainer />
                </Grid>
                <Grid item xs={10}>
                    <Products />
                </Grid>
            </Grid>
            </div>
        )
    }
}
