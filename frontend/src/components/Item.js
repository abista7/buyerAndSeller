import React, {Component} from 'react'
import {purchaseItem} from '../redux/actions/itemActions';

class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {item: {}}
    }

    componentDidMount() {  
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const id = params.get('id');
        console.log(this.props.itemsState.length);
        for(var i = 0; i < this.props.itemsState.length; i++) {
            if(this.props.itemsState[i]._id == id) {
                console.log()
                this.setState({
                    item: this.props.itemsState[i]
                })
            }
        }
    }


    render() {
        return (
            <div>
                <div className="card bg-light mt-5 col-md-4 offset-md-4">
                    <div className="card-header border h4">Page for a item with id ({this.state.item._id}) reached</div>
                    <div className="card-body">
                        <div className="card-title h3">Name of item: {this.state.item.name}</div><hr/>
                        <p className="card-text h4">Price: ${this.state.item.price}</p>
                        <p className="card-text h4">Description: {this.state.item.description}</p>
                        <p className="card-text h4">Seller: {this.state.item.seller}</p>
                    </div>
                </div>
                <div className="mt-3">
                    {this.props.loginState && this.props.userRole=="buyer" && (
                        <button className="btn btn-primary" onClick={purchaseItem(this.state.item._id, this.state.item.name, 
                            this.state.item.price, this.state.item.description, this.state.item.seller)}>Purchase Item</button>
                    )}
                </div>
            </div>
        )
    }
}

export default Item;
