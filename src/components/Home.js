import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink as RouterLink } from "react-router-dom";
import {
  getArticles,
  getFeed,
  favoriteArticle,
  unfavoriteArticle,
} from "../actions/articles";
import { getProfile } from "../actions/users";
import Article from "./Article";
import Pagination from './Pagination';

function Home(props) {
  const {
    articles,
    articlesCount,
    onGetArticle,
    token,
    loading,
    tags,
    onShowLoading,
    onGetFeed,
    onGetProfile,
    onFavoriteArticle,
    onUnfavoriteArticle,
  } = props;
  const [tag, setTag] = useState("");
  const [page, setPage] = useState(1);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  React.useEffect(() => {
    let offset = (page * 10) - 10; 
    onGetArticle(null, offset);
  }, [page]);
  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {token ? (
                  <li className="nav-item">
                    <RouterLink
                      className="nav-link"
                      to={`/yourFeed`}
                      onClick={() => (onShowLoading(), onGetFeed(token).then(() => setTag("")))}
                    >
                      Your Feed
                    </RouterLink>
                  </li>
                ) : null}
                <li className="nav-item">
                  <RouterLink
                  isActive ={(match, location) => {
                    return location.pathname === '/' && tag === ''
                  }}
                    className="nav-link"
                    to={"/"}
                    onClick={() => (onShowLoading(), onGetArticle().then(() => setTag("")))}
                  >
                    Global Feed
                  </RouterLink>
                </li>
                {tag ? (
                  <li className="nav-item">
                    <RouterLink className="nav-link" to="">
                      # {tag}
                    </RouterLink>
                  </li>
                ) : null}
              </ul>
            </div>
            <Article
              articles={articles}
              onGetArticle={onGetArticle}
              token={token}
              loading={loading}
              onGetProfile={onGetProfile}
              onFavoriteArticle={onFavoriteArticle}
              onUnfavoriteArticle={onUnfavoriteArticle}
              onShowLoading={onShowLoading}
            />
            <Pagination articlesCount={articlesCount} onChangePage={handleChangePage} page={page} />
          </div>
          
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <div className="tag-list">
                {tags.map((tag) => {
                  return (
                    <RouterLink
                      to=""
                      key={tag}
                      className="tag-pill tag-default"
                      onClick={() =>
                        onGetArticle(`tag=${tag}`).then(() => setTag(tag))
                      }
                    >
                      {tag}
                    </RouterLink>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  articles: state.articles.articles,
  token: state.users.token,
  tags: state.articles.tags,
  articlesCount: state.articles.articlesCount,
  loading: state.articles.loading
});

const mapDispatchToProps = (dispatch) => ({
  onGetArticle: (param, offset) => dispatch(getArticles(param, offset)),
  onGetFeed: (token) => dispatch(getFeed(token)),
  onGetProfile: (username) => dispatch(getProfile(username)),
  onFavoriteArticle: (token, slug) => dispatch(favoriteArticle(token, slug)),
  onUnfavoriteArticle: (token, slug) =>
    dispatch(unfavoriteArticle(token, slug)),
    onShowLoading: () => dispatch({type: 'SHOW_LOADING'})
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
