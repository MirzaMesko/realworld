import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

function Header(props) {
  const { token, onLogout } = props;
    return (
        <nav className="navbar navbar-light">
      <div className="container">
        <RouterLink className="navbar-brand" to="index.html">conduit</RouterLink>
        { token ? 
        <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <RouterLink className="nav-link active" to="/">Home</RouterLink>
        </li>
        <li className="nav-item">
          <RouterLink className="nav-link" to="">
            <i className="ion-compose"></i>&nbsp;New Post
          </RouterLink>
        </li>
        <li className="nav-item">
          <RouterLink className="nav-link" to="">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </RouterLink>
        </li>
        <li className="nav-item">
          <RouterLink className="nav-link" to="/" onClick={onLogout}>Log out</RouterLink>
        </li>
      </ul>
      : 
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <RouterLink className="nav-link active" to="/">Home</RouterLink>
        </li>
        <li className="nav-item">
          <RouterLink className="nav-link" to="/login">Sign in</RouterLink>
        </li>
        <li className="nav-item">
          <RouterLink className="nav-link" to="/register">Sign up</RouterLink>
        </li>
      </ul>
      }  
      </div>
    </nav>
    )
}

export default Header;