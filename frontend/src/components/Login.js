import React from 'react';
import {connect} from 'react-redux';
import {setUser, setPassword, login} from '../redux/actions/userActions';

const Login = ({isLoggedIn, dispatch, email, role}) => {
    const attemptLogin = () => {
        //query mongo with entered data, then 
        //if user credentials are good
        dispatch(login());
        //dispatch(setIsLoggedIn(true)); //temporary, check db with password and user value before doing this
       
        //else return jsx component with invalid message
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
                            onClick={attemptLogin}
                            className="btn btn-primary mb-2">
                            Login
                        </button>
                    </div>
                </div>    
            )}
            <h1>TEST: email is ({email}) <br/>and the role is ({role})</h1>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.userReducer.user,
    email: state.userReducer.email,
    role: state.userReducer.role,
    password: state.userReducer.password,
    isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(Login);