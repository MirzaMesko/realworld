import { connect } from 'react-redux';
import { registerUser } from '../actions/users';
import React, { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

function Register(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  const {currUser, token, onRegister} = props;
  console.log({currUser, token});

  const registerNewUser = (event) => {
    event.preventDefault();
    const user = {
      username: username, 
      email: email, 
      password: password
    }
    console.log({user, currUser, token});
    onRegister(user);
  }  
    return (
        <div className="auth-page">
  <div className="container page">
    <div className="row">

      <div className="col-md-6 offset-md-3 col-xs-12">
        <h1 className="text-xs-center">Sign up</h1>
        <p className="text-xs-center">
          <RouterLink to="/login">Have an account?</RouterLink>
        </p>

        <ul className="error-messages">
          <li>That email is already taken</li>
        </ul>

        <form onSubmit={registerNewUser}>
          <fieldset className="form-group">
            <input className="form-control form-control-lg" type="text" placeholder="Username" onChange={handleUsernameChange}/>
          </fieldset>
          <fieldset className="form-group">
            <input className="form-control form-control-lg" type="text" placeholder="Email" onChange={handleEmailChange}/>
          </fieldset>
          <fieldset className="form-group">
            <input className="form-control form-control-lg" type="password" placeholder="Password" onChange={handlePasswordChange}/>
          </fieldset>
          <button className="btn btn-lg btn-primary pull-xs-right" >
            Sign up
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
    )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  token: state.token
  }
  
}

const mapDispatchToProps = (dispatch) => ({
  onRegister: (user) => dispatch(registerUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);