import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Nav from './components/Nav.js';
import ItemList from './components/ItemList.js'
import Item from './components/Item.js';
import Login from './components/Login.js';
import Cart from './components/Cart.js';
import Register from './components/Register.js';
import Buyer from './components/Buyer.js';
import Seller from './components/Seller.js';
import NotFound from './components/NotFound.js';
import Logout from './components/Logout.js';


const App = ({items, role, isLoggedIn}) => {
    return (
        <div className="App">
            <Nav />
            <Switch>
                <Route exact path="/" component={ItemList} />
                <Route path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/item" component={() => <Item itemsState={items} userRole={role} loginState={isLoggedIn}/>} />
                <Route exact path="/user/buyer" component={Buyer} />
                <Route exact path="/user/seller" component={Seller} />
                <Route exact path="/logout" component={Logout} />
                <Route path="*" component={NotFound} />
            </Switch>
        </div>
    );
}
const mapStateToProps = state => ({
    items: state.itemReducer.items,
    isLoggedIn: state.userReducer.isLoggedIn,
    role: state.userReducer.role,
});
export default connect(mapStateToProps)(App);
