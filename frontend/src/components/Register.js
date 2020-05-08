import React from 'react';
import {connect} from 'react-redux';
import {setEmail, setIsLoggedIn, setUser, setPassword, setRole} from '../redux/actions/userActions';

const Register = ({isLoggedIn, dispatch, user, role, password, email}) => {
    const register = () => {
        //query mongo with entered data, then 
        //if user credentials are good
        dispatch(setIsLoggedIn(true)); //temporary, check db with password and user value before doing this

        //else return jsx component with invalid message
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
                            <input type="email" className="form-control mb-2" id="username" placeholder="enter your email"  onChange={e=> dispatch(setEmail(e.target.value))}/>
                        </div>
                        <div className="pb-2">
                            <label className="float-left">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="select a password"  onChange={e=> dispatch(setPassword(e.target.value))}/>
                        </div>
                        <div>
                            <label className="float-left">Which kind of account are you creating?</label>
                            <select className="float-left form-control md-3" value={user.role} onChange={e => dispatch(setRole(e.target.value))}>    
                                <option selected disabled hidden>Choose type</option>
                                <option value="Buyer">Buyer</option>
                                <option value="Seller">Seller</option>
                            </select>
                        </div>
                        <div className="text-left">
                            <button    
                                type="submit"  
                                onClick={register}
                                className="btn btn-primary mb-2 mt-3">
                                Submit
                            </button>
                        </div>
                    </div>  
                    </form>  
                    
                )}
            </div> 
            <h5 className="mt-5">TEST: value of user is {user}</h5> 
            <h5 className="mt-5">TEST: value of password is {password}</h5> 
            <h5 className="mt-5">TEST: value of email is {email}</h5> 
            <h5 className="mt-5">TEST: value of email is {role}</h5> 
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