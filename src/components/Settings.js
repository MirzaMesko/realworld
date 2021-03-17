import React, {useState} from 'react';
import { connect } from "react-redux";
import { NavLink as RouterLink } from "react-router-dom";
import { editUser, getProfile } from '../actions/users';

function Settings(props) {
  const { onLogout, token, onEditUser, history, onGetProfile, user, currentUser, onGetArticle } = props;
    const [image, setImage] = useState(currentUser.image);
    const [email, setEmail] = useState(currentUser.email);
    const [username, setUsername] = useState(currentUser.username);
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState(currentUser.bio);
  

  const handleImageChange = (event) => {
      setImage(event.target.value)
  }

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

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const editUser = (event) => {
    event.preventDefault();
     onEditUser(token, email, username, password, image, bio);
     history.push(`/@:${username}`);
}
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <form onSubmit={editUser}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    onChange={handleImageChange}
                    value={image}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows="8"
                    value={bio}
                    placeholder="Short bio about you"
                    onChange={handleBioChange}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    onChange={handleEmailChange}
                    value={email}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
                  Update Settings
                </button>
              </fieldset>
            </form>
            <button className="btn btn-outline-danger">
              <RouterLink className="nav-link" to="/" onClick={onLogout}>
                Log out
              </RouterLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.users.token,
  user: state.users.user,
  currentUser: state.users.currentUser
});

const mapDispatchToProps = dispatch => ({
    onEditUser: (token, email, username, password, image, bio) => dispatch(editUser(token, email, username, password, image, bio)),
    onGetProfile: (username) => dispatch(getProfile(username))
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
