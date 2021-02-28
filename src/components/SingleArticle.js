import React, { useState } from "react";
import { connect } from "react-redux";
import { getComments } from '../actions/articles'; 

function SingleArticle(props) {
    const { articles, match, onGetComments, token, comments } = props;

    let article = articles.filter(item => `:${item.slug}` == match.params.id);
    console.log(match.params.id, 'articles: ', articles, article);

    React.useEffect(() => {
        onGetComments(token, match.params.id.slice(1))
    }, [match.params.id])
    return (
        <div className="article-page">

        <div className="banner">
          <div className="container">
            
            <h1>{article[0].title}</h1>
      
            <div className="article-meta">
              <a href=""><img src={article[0].author.image} /></a>
              <div className="info">
                <a href="" className="author">{article[0].author.username}</a>
                <span className="date">{new Date(article[0].createdAt).toDateString()}</span>
              </div>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round"></i>
                &nbsp;
                Follow {article[0].author.username} <span className="counter">(10)</span>
              </button>
              &nbsp;&nbsp;
              <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart"></i>
                &nbsp;
                Favorite Post <span className="counter">({article[0].favoritesCount})</span>
              </button>
            </div>
      
          </div>
        </div>
      
        <div className="container page">
      
          <div className="row article-content">
            <div className="col-md-12">
              <p>
              {article[0].description}
              </p>
              <h2 id="introducing-ionic">{article[0].title}</h2>
              <p>{article[0].body}</p>
            </div>
          </div>
          <hr />
      
          <div className="row">
      
            <div className="col-xs-12 col-md-8 offset-md-2">
      
              <form className="card comment-form">
                <div className="card-block">
                  <textarea className="form-control" placeholder="Write a comment..." rows="3"></textarea>
                </div>
                <div className="card-footer">
                  <img src={article[0].author.image} className="comment-author-img" />
                  <button className="btn btn-sm btn-primary">
                   Post Comment
                  </button>
                </div>
              </form>

              {comments && comments.map(comment => {
                  return (
                    <div className="card" key={comment.id}>
                    <div className="card-block">
                      <p className="card-text">{comment.body}</p>
                    </div>
                    <div className="card-footer">
                      <a href="" className="comment-author">
                        <img src={comment.author.image} className="comment-author-img" />
                      </a>
                      &nbsp;
                      <a href="" className="comment-author">{comment.author.username}</a>
                      <span className="date-posted">{new Date(comment.createdAt).toDateString()}</span>
                    </div>
                  </div>
                  )
              })}
              
            </div>
      
          </div>
      
        </div>
      
      </div>
    )
}

const mapStateToProps = (state) => ({
    articles: state.articles.articles,
    token: state.users.token,
    comments: state.articles.comments
  });

  const mapDispatchToProps = dispatch => ({
    onGetComments: (token, slug) => dispatch(getComments(token, slug))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle);