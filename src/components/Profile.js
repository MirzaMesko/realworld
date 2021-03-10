import { connect } from "react-redux";
import { NavLink as RouterLink } from "react-router-dom";
import { getArticles } from "../actions/articles";
import Article from './Article';
import { followUser, unfollowUser, getProfile } from '../actions/users';

function Profile(props) {
    const { articles, onGetArticle, onUnfollowUser, onFollowUser, token, user, profile, onGetProfile } = props;

    let button = (
        <span>
            {!profile.following ?
            <button className="btn btn-sm btn-outline-secondary pull-xs-right" onClick={() => onFollowUser(token, profile.username)}>
              <i className="ion-plus-round"></i>
              &nbsp;  Follow {profile.username} 
            </button>
              : 
              <button className="btn btn-sm btn-outline-secondary pull-xs-right" onClick={() => onUnfollowUser(token, profile.username)}>
              <i className="ion-plus-round"></i>
              &nbsp;  Unfollow {profile.username} 
            </button>
            }
        </span>
    )
if (profile.username === user) {
    button = (
        <span>
            <button className="btn btn-sm btn-outline-secondary action-btn pull-xs-right" >
            <RouterLink  to="/settings">
              <i className="ion-gear-a"></i>
              &nbsp;  Edit Profile Settings 
              </RouterLink>
            </button>
        </span>
    )
}

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={profile.image} className="user-img" />
              <h4>{profile.username}</h4>
              <p>
              {profile.bio}
              </p>
              {button}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <RouterLink className="nav-link" to ={`/@:${profile.username}`} onClick={() => onGetArticle(`/?author=${profile.username}`)}>
                    My Articles
                  </RouterLink>
                </li>
                <li className="nav-item">
                  <RouterLink className="nav-link" to ={`/@:${profile.username}/favorited`} onClick={() => onGetArticle(`/?favorited=${profile.username}`)}>
                    Favorited Articles
                  </RouterLink>
                </li>
              </ul>
            </div>
            <Article articles={articles} onGetArticle={onGetArticle} onGetProfile={onGetProfile}/>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
    articles: state.articles.articles,
    token: state.users.token,
    user: state.users.user,
    profile: state.users.profile
  });

  const mapDispatchToprops = dispatch => ({
    onGetArticle: (param) => dispatch(getArticles(param)),
    onFollowUser: (token, username) => dispatch(followUser(token, username)),
  onUnfollowUser: (token, username) => dispatch(unfollowUser(token, username)),
  onGetProfile: (username) => dispatch(getProfile(username))
  })

export default connect(mapStateToProps, mapDispatchToprops)(Profile);
