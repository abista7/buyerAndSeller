import React, {useState} from 'react';
import {connect} from 'react-redux';
import {setEmail, setUser, setPassword, setRole, register} from '../redux/actions/userActions';
import {Redirect} from 'react-router-dom';

const Register = ({isLoggedIn, dispatch, role}) => {
    const [failedRegister, setFailedRegister] = useState(false);
    const [registerDup, setRegisterDup] = useState(false);

    const attemptRegister = (event) => {
        event.preventDefault();
        dispatch(register()); 
    }

    const checkIfSuccess= () => {
        if(!isLoggedIn)
            setFailedRegister(true);
        if(role=="register_duplicate") {
            setRegisterDup(true);
            dispatch(setRole(""));
        }
    }

    return (
        <div>    
            <div className="card bg-light mt-4 col-3 offset-md-4">   
                {!isLoggedIn && (
                    <form>
                    <div>
                        <br /><p className="display-4 pb-3"><em>Register</em></p>
                        <div>
                            <label className="float-left">Username</label>
                            <input type="text" className="form-control mb-2" id="username" placeholder="enter a username"  onChange={e=> dispatch(setUser(e.target.value))} />
                        </div>
                        <div>
                            <label className="float-left">Email</label>
                            <input name="email" type="email" className="form-control mb-2" id="username" placeholder="enter your email"  onChange={e=> dispatch(setEmail(e.target.value))}/>
                        </div>
                        <div className="pb-2">
                            <label className="float-left">Password</label>
                            <input name="password" type="password" className="form-control" id="password" placeholder="select a password"  onChange={e=> dispatch(setPassword(e.target.value))}/>
                        </div>
                        <div>
                            <label className="float-left">Which kind of account are you creating?</label>
                            <select className="float-left form-control md-3" onChange={e => dispatch(setRole(e.target.value))}>    
                                <option selected disabled hidden>Choose type</option>
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>
                        <div className="text-left">
                            <button    
                                onClick={(e) => {setFailedRegister(false);  attemptRegister(e); checkIfSuccess();}}
                                className="btn btn-primary mb-2 mt-3">
                                Submit
                            </button>
                        </div>
                    </div>  
                    </form>  
                    
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
                {failedRegister && !isLoggedIn && registerDup && (
                    <div className="mt-3 mb-3 card bg-danger text-white"> That email or username is already in use, try again. </div>
                )}
                {failedRegister && !isLoggedIn && !registerDup && (
                    <div className="mt-3 mb-3 card bg-danger text-white"> Invalid credentials entered, please fix and try again. </div>
                )}
            </div> 
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.userReducer.user,
    password: state.userReducer.password,
    email: state.userReducer.email,
    role: state.userReducer.role,
    isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(Register);