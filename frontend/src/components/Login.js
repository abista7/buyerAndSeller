import React, {useState} from 'react'
import {connect} from 'react-redux';
import {setUser, setPassword, login} from '../redux/actions/userActions';
import {Redirect} from 'react-router-dom';

const Login = ({isLoggedIn, dispatch, role}) => {
    const [failedLogin, setFailedLogin] = useState(false);

    const attemptLogin = () => {
        dispatch(login());
    }

    const checkIfSuccess= () => {
        if(!isLoggedIn)
            setFailedLogin(true);
    }

    return (
        <div className="card bg-light mt-4 col-3 offset-md-4">
          
            {!isLoggedIn && (
                <div>
                    <br /><p className="display-4 pb-3"><em>Login</em></p>
                    <div>
                        <label className="float-left">Username</label>
                        <input type="text" className="form-control mb-2" id="username" placeholder="enter username"  onChange={e=> dispatch(setUser(e.target.value))}/>
                    </div>
                    <div className="pb-2">
                        <label className="float-left">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="enter password"  onChange={e=> dispatch(setPassword(e.target.value))}/>
                    </div>
                    <div className="text-left">
                        <button 
                            id="submit" 
                            onClick={() => {attemptLogin(); checkIfSuccess();}}
                            className="btn btn-primary mb-2">
                            Login
                        </button>
                    </div>
                </div>    
            )}
            {isLoggedIn && (
                <div>
                    <div className="mt-3 mb-3 card bg-success text-white"> Successfully logged in! </div>
                        <div>
                        {role=="buyer" && ( 
                            <Redirect to={{ pathname: "/user/buyer"}}/>
                        )}
                        {role=="seller" && ( 
                           <Redirect to={{ pathname: "/user/seller"}}/>
                        )}
                    </div>
                </div>
            )}
            {failedLogin && !isLoggedIn && (
                <div className="mt-3 mb-3 card bg-danger text-white"> Invalid credentials, please try again. </div>
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.userReducer.user,
    role: state.userReducer.role,
    password: state.userReducer.password,
    isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(Login);