import React, { useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  getComments,
  addComment,
  favoriteArticle,
  getArticles,
  unfavoriteArticle,
  deleteArticle,
  deleteComment
} from "../actions/articles";
import { followUser, unfollowUser } from "../actions/users";

function SingleArticle(props) {
  const [body, setBody] = useState("");
  const {
    articles,
    match,
    user,
    onGetComments,
    token,
    comments,
    onAddComment,
    onFavoriteArticle,
    onGetArticle,
    onFollowUser,
    onUnfavoriteArticle,
    onUnfollowUser,
    profile,
    onDeleteArticle,
    history,
    onDeleteComment
  } = props;

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  let article = articles;
  if (articles.length > 1) {
    article = articles.filter((item) => `:${item.slug}` == match.params.id);
  }

  const comment = (event) => {
    event.preventDefault();
    onAddComment(token, match.params.id.slice(1), body);
    event.target.reset();
  };

  let buttons = (
    <span>
      {profile.following === false ? (
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => onFollowUser(token, profile.username)}
        >
          <i className="ion-plus-round"></i>
          &nbsp; Follow {profile.username}
        </button>
      ) : (
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => onUnfollowUser(token, profile.username)}
        >
          <i className="ion-plus-round"></i>
          &nbsp; Unfollow {profile.username}
        </button>
      )}
      &nbsp;&nbsp;
      {!article[0].favorited ? (
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => onFavoriteArticle(token, article[0].slug)}
        >
          <i className="ion-heart"></i>
          &nbsp; Favorite Post
          <span className="counter">({article[0].favoritesCount})</span>
        </button>
      ) : (
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => onUnfavoriteArticle(token, article[0].slug)}
        >
          <i className="ion-heart"></i>
          &nbsp; Unfavorite Post
          <span className="counter">({article[0].favoritesCount})</span>
        </button>
      )}
    </span>
  );

  if (profile.username === user) {
    buttons = (
      <span>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => onFavoriteArticle(token, article[0].slug)}
        >
          <i className="ion-edit"></i>
          &nbsp; Edit Article
        </button>
        &nbsp;&nbsp;
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => onDeleteArticle(token, article[0].slug).then(() => history.push(`/@${profile.username}`))}
        >
          <i className="ion-trash-a"></i>
          &nbsp; Delete Article
        </button>
      </span>
    );
  }

  React.useEffect(() => {
    onGetComments(token, match.params.id.slice(1));
  }, [match.params.id]);
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article[0].title}</h1>

          <div className="article-meta">
            <a href="">
              <img src={profile.image} />
            </a>
            <div className="info">
              <RouterLink
                to={`/@:${profile.username}`}
                className="author"
                onClick={() =>
                  onGetArticle(`/?author=${profile.username}`)
                }
              >
                {profile.username}
              </RouterLink>
              <span className="date">
                {new Date(article[0].createdAt).toDateString()}
              </span>
            </div>
            {buttons}
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <div>
              <p>{article[0].body}</p>
            </div>
            {article[0].tagList.length > 1 && (
              <ul className="tag-list">
                {article[0].tagList.map((tag) => {
                  return (
                    <li class="tag-default tag-pill tag-outline">{tag}</li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <hr />

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form" onSubmit={comment}>
              <div className="card-block">
                <textarea
                  className="form-control"
                  placeholder="Write a comment..."
                  rows="3"
                  onChange={handleBodyChange}
                ></textarea>
              </div>
              <div className="card-footer">
                <img
                  src={profile.image}
                  className="comment-author-img"
                />
                <button className="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>

            {comments &&
              comments.map((comment) => {
                let date = new Date(comment.createdAt);
                return (
                  <div className="card" key={comment.id}>
                    <div className="card-block">
                      <p className="card-text">{comment.body}</p>
                    </div>
                    <div className="card-footer">
                      <a href="" className="comment-author">
                        <img
                          src={comment.author.image}
                          className="comment-author-img"
                        />
                      </a>
                      &nbsp;
                      <a href="" className="comment-author">
                        {comment.author.username}
                      </a>
                      <span className="date-posted">
                        {date.toDateString()}, {date.getHours()}:
                        {date.getMinutes()}
                      </span>
                      {comment.author.username === user ? 
                      <span className="mod-options" onClick={() => onDeleteComment(token, article[0].slug, comment.id)}>
                      <i className="ion-trash-a"></i>
                    </span> 
                    : null
                    }
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  articles: state.articles.articles,
  token: state.users.token,
  comments: state.articles.comments,
  user: state.users.user,
  profile: state.users.profile
});

const mapDispatchToProps = (dispatch) => ({
  onGetComments: (token, slug) => dispatch(getComments(token, slug)),
  onAddComment: (token, slug, body) => dispatch(addComment(token, slug, body)),
  onFavoriteArticle: (token, slug) => dispatch(favoriteArticle(token, slug)),
  onUnfavoriteArticle: (token, slug) =>
    dispatch(unfavoriteArticle(token, slug)),
  onGetArticle: (param) => dispatch(getArticles(param)),
  onFollowUser: (token, username) => dispatch(followUser(token, username)),
  onUnfollowUser: (token, username) => dispatch(unfollowUser(token, username)),
  onDeleteArticle: (token, slug) => dispatch(deleteArticle(token, slug)),
  onDeleteComment: (token, slug, id) => dispatch(deleteComment(token, slug, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle);
