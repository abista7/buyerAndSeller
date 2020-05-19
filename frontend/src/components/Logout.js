import React, {useEffect} from 'react';
import {setIsLoggedIn} from '../redux/actions/userActions';
import {connect} from 'react-redux';

const Logout = ({dispatch}) => {
    useEffect(() => {   
        dispatch(setIsLoggedIn(false));
    }, []);

    return (
        <div className="mt-3 card">
            <p className="display-4">You have successfully logged out.</p>
        </div>
    );
}

const mapStateToProps = state => ({
    isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(Logout);