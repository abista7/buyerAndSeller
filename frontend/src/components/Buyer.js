import React, {useState} from 'react'
import {connect} from 'react-redux'
import ItemList from './ItemList.js'

const Buyer = ({isLoggedIn, role, user, items}) => {
    const [showHistory, toggleShowHistory] = useState(false);
    const [showCatalog, toggleShowCatalog] = useState(true);

    return (
        <div className="container mt-4">
            {isLoggedIn && role == "buyer" && (
                <div>
                    <div className="display-4">Welcome {user}</div>

                    <button className="btn btn-primary mt-4 mb-4" onClick={() => {toggleShowHistory(!showHistory); toggleShowCatalog(!showCatalog);}}>
                        Toggle Purchase History
                    </button>
            
                    <div className="justify-content-center pt-2" style={{display: 'flex', flexWrap: 'wrap'}}>
                    {showHistory && (items.map((item, key) => {
                        return (
                            <div>
                                {item.purchasers.includes(user) && (
                                    <div className="card b-3 bg-light px-4 pt-3 pb-3 mx-4" key={key}>    
                                        <div class="card-header border">{item.name}</div>
                                        <div class="card-body">
                                            <h5 class="card-title">Purchased for ${item.price}</h5>
                                            <hr/>
                                            <p class="card-text">Sold by: {item.seller}</p>                                       
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    }))}
                    </div>
                </div>
            )}
            {showCatalog && <ItemList />}
        </div>
    );
    
}

const mapStateToProps = state => ({
    user: state.userReducer.user,
    isLoggedIn: state.userReducer.isLoggedIn,
    role: state.userReducer.role,
    items: state.itemReducer.items,
});

export default connect(mapStateToProps)(Buyer);
