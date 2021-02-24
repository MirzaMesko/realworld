import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink as RouterLink } from "react-router-dom";
import { getArticles, getFeed } from "../actions/articles";
import Article from './Article';

function Home(props) {
  const { articles, onGetArticle, token, tags, onGetFeed } = props;
  const [tag, setTag] = useState('');

  React.useEffect(() => {
    onGetArticle();
  }, []);
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
                {token ?
                <li className="nav-item">
                <RouterLink className="nav-link disabled" to="" onClick={() => onGetFeed(token).then(() => setTag(''))} >
                  Your Feed
                </RouterLink>
              </li>
              : null }
                <li className="nav-item">
                  <RouterLink className="nav-link active" to={"/"} onClick={() => onGetArticle().then(() => setTag(''))}>
                    Global Feed
                  </RouterLink>
                </li>
                {tag ?
              <li className="nav-item">
              <RouterLink className="nav-link active" to="" >
                # {tag}
              </RouterLink>
            </li>  
              : null}
              </ul>
            </div>
             <Article articles={articles} onGetArticle={onGetArticle} />
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <div className="tag-list">
                {tags.map(tag => {
                    return <RouterLink to="" className="tag-pill tag-default" onClick={() => onGetArticle(`/?tag=${tag}`).then(() => setTag(tag))}>
                    {tag}
                  </RouterLink>
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
  tags: state.articles.tags
});

const mapDispatchToprops = dispatch => ({
  onGetArticle: (param) => dispatch(getArticles(param)),
  onGetFeed: (token) => dispatch(getFeed(token))
})

export default connect(mapStateToProps, mapDispatchToprops)(Home);
