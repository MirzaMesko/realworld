import { connect } from 'react-redux';
import { login } from '../actions/users';
import React, { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState([]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const { onLogin, history } = props;

  const login = (event) => {
    event.preventDefault();
    setErrors([]);
    const user = {
      email: email, 
      password: password
    }
    onLogin(user).then((response) => {
      if(response.status === 200) {
        history.push('/');
      }
      if(response.status !== 200) {
        let keys = Object.keys(response);
        let error = [];
        keys.map((key) => {
          error.push([key + " " + response[key]]);
        });
        setErrors(error);
      }
    });
  }  
    return (
        <div className="auth-page">
  <div className="container page">
    <div className="row">

      <div className="col-md-6 offset-md-3 col-xs-12">
        <h1 className="text-xs-center">Sign in</h1>
        <p className="text-xs-center">
          <RouterLink to="/register">Need an account?</RouterLink>
        </p>

        {errors.length ? 
        <ul className="error-messages">
          {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      : null
      }
        

        <form onSubmit={login}>
          <fieldset className="form-group">
            <input className="form-control form-control-lg" type="text" placeholder="Email" onChange={handleEmailChange} />
          </fieldset>
          <fieldset className="form-group">
            <input className="form-control form-control-lg" type="password" placeholder="Password" onChange={handlePasswordChange} />
          </fieldset>
          <button className="btn btn-lg btn-primary pull-xs-right">
            Sign in
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
    user: state.users.user,
  token: state.users.token,
  }
  
}

const mapDispatchToProps = dispatch => ({
  onLogin: (user) => dispatch(login(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);