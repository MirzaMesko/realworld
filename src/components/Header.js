import React from 'react';
import { connect } from "react-redux";
import { NavLink as RouterLink } from 'react-router-dom';

function Header(props) {
  const { token, onGetArticle, onGetProfile, currentUser } = props;
    return (
        <nav className="navbar navbar-light">
      <div className="container">
        <RouterLink className="navbar-brand" to="index.html">conduit</RouterLink>
        { token ? 
        <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <RouterLink className="nav-link" to="/">Home</RouterLink>
        </li>
        <li className="nav-item">
          <RouterLink className="nav-link" to="/editor">
            <i className="ion-compose"></i>&nbsp;New Post
          </RouterLink>
        </li>
        <li className="nav-item">
          <RouterLink className="nav-link" to="/settings">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </RouterLink>
        </li>
        <li className="nav-item">
          <RouterLink to={`/@:${currentUser.username}`} className="nav-link" onClick={() => onGetArticle(`/?author=${currentUser.username}`).then(() => onGetProfile(currentUser.username))}>
            <img class="user-pic" src={currentUser.image}/>
            {currentUser.username}
            </RouterLink>
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

const mapStateToProps = (state) => ({
  token: state.users.token,
  currentUser: state.users.currentUser
});

export default connect(mapStateToProps)(Header);