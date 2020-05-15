import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';

import Nav from './components/nav.js';
import ItemList from './components/ItemList.js'
import Item from './components/Item.js';
import Login from './components/Login.js';
import ItemInfo from './components/ItemInfo.js'
import Cart from './components/Cart.js';
import Register from './components/Register.js';
import Buyer from './components/Buyer.js';
import Seller from './components/Seller.js';
import NotFound from './components/notFound.js';

function App() {
    return (
        <div className="App">
            <Nav />
            <Switch>
                <Route exact path="/" component={ItemList} />
                <Route path="/itemInfo" component={ItemInfo} />
                <Route path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/user/buyer" component={Buyer} />
                <Route exact path="/user/seller" component={Seller} />
                <Route path="*" component={NotFound} />
            </Switch>
        </div>
    );
}

export default App;
