import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink as RouterLink } from "react-router-dom";
import {
  getArticles,
  favoriteArticle,
  unfavoriteArticle,
} from "../actions/articles";
import Article from "./Article";
import Pagination from './Pagination';
import { followUser, unfollowUser, getProfile } from "../actions/users";

function Profile(props) {
  const {
    articles,
    onGetArticle,
    onUnfollowUser,
    onFollowUser,
    token,
    user,
    profile,
    onGetProfile,
    onUnfavoriteArticle,
    onFavoriteArticle,
    articlesCount,
    loading, 
    onShowLoading
  } = props;
  const [page, setPage] = useState(1);
  const [view, setView] = useState('authored')

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };


  React.useEffect(() => {
    let offset = (page * 10) - 10; 
    {view === 'authored' ? onGetArticle(`author=${profile.username}`, offset) : onGetArticle(`favorited=${profile.username}`, offset)}
    ;
  }, [page, profile, view]);

  
  

  if (loading) {
    return (
      <div className="article-preview"></div>
    );
  }

  let button = (
    <span>
      {!profile.following ? (
        <button
          className="btn btn-sm btn-outline-secondary pull-xs-right"
          onClick={() => onFollowUser(token, profile.username)}
        >
          <i className="ion-plus-round"></i>
          &nbsp; Follow {profile.username}
        </button>
      ) : (
        <button
          className="btn btn-sm btn-outline-secondary pull-xs-right"
          onClick={() => onUnfollowUser(token, profile.username)}
        >
          <i className="ion-plus-round"></i>
          &nbsp; Unfollow {profile.username}
        </button>
      )}
    </span>
  );
  if (profile.username === user) {
    button = (
      <span>
        <button className="btn btn-sm btn-outline-secondary action-btn pull-xs-right">
          <RouterLink to="/settings">
            <i className="ion-gear-a"></i>
            &nbsp; Edit Profile Settings
          </RouterLink>
        </button>
      </span>
    );
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={profile.image} className="user-img" />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>
              {token && button}
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
                  <RouterLink
                  isActive = {() => {
                    return view === 'authored'
                  }}
                    className="nav-link"
                    to={`/@:${profile.username}`}
                    onClick={() => 
                      (onShowLoading(), onGetArticle(`author=${profile.username}`, 0)
                    .then(() => (setView('authored'), setPage(1))))}
                  >
                    My Articles
                  </RouterLink>
                </li>
                <li className="nav-item">
                  <RouterLink
                  isActive = {() => {
                    return view === 'favorited'
                  }}
                    className="nav-link"
                    to={`/@:${profile.username}/favorited`}
                    onClick={() =>
                      (onShowLoading(), onGetArticle(`favorited=${profile.username}`, 0)
                      .then(() => (setView('favorited')), setPage(1)))}
                  >
                    Favorited Articles
                  </RouterLink>
                </li>
              </ul>
            </div>
            <Article
              articles={articles}
              onGetArticle={onGetArticle}
              onGetProfile={onGetProfile}
              onFavoriteArticle={onFavoriteArticle}
              onUnfavoriteArticle={onUnfavoriteArticle}
              token={token}
              loading={loading}
              onShowLoading={onShowLoading}
            />
             <Pagination articlesCount={articlesCount} onChangePage={handleChangePage} page={page} />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  articles: state.articles.articles,
  articlesCount: state.articles.articlesCount,
  token: state.users.token,
  user: state.users.user,
  profile: state.users.profile,
  loading: state.articles.loading
});

const mapDispatchToprops = (dispatch) => ({
  onGetArticle: (param, offset) => dispatch(getArticles(param, offset)),
  onFollowUser: (token, username) => dispatch(followUser(token, username)),
  onUnfollowUser: (token, username) => dispatch(unfollowUser(token, username)),
  onGetProfile: (username) => dispatch(getProfile(username)),
  onFavoriteArticle: (token, slug) => dispatch(favoriteArticle(token, slug)),
  onUnfavoriteArticle: (token, slug) =>
    dispatch(unfavoriteArticle(token, slug)),
    onShowLoading: () => dispatch({ type: 'SHOW_LOADING'}),
});

export default connect(mapStateToProps, mapDispatchToprops)(Profile);
