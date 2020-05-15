import React, { Component } from 'react';
import {Link} from 'react-router-dom';
//https://www.iconfinder.com/icons/3057646/creative_market_media_social_icon
import siteImg from '../siteImg.png'

class Nav extends Component {
    render() {
        return (
            <div className="navbar navbar-expand-md navbar-secondary bg-light">
                <Link to='/'>
                    <img src={siteImg} alt="The 9.5 Exchange" className="navbar-brand" />
                </Link> 
                <h1>The 9.5 Exchange</h1>

                <ul className="navbar-nav align-items-center">
                    <li className="nav-item ml-5"><Link to='/' className="nav-link">Browse Items</Link></li>
                    <li className="nav-item ml-5"><Link to='/Login' className="nav-link">Login</Link></li>
                    <li className="nav-item ml-5"><Link to='/register' className="nav-link">Register</Link></li>
                </ul>
                <Link to="/cart" className="ml-auto">
                    <button className="btn btn-secondary">Cart</button>
                </Link>
            </div>
        )
    }
}

export default Nav;