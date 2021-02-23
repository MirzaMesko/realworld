import { connect } from "react-redux";
import { getArticles } from "../actions/articles";
import Article from './Article';

function Profile(props) {
    const { articles, onGetArticle } = props;
  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={articles[0].author.image} className="user-img" />
              <h4>{articles[0].author.username}</h4>
              <p>
              {articles[0].author.bio}
              </p>
              <button className="btn btn-sm btn-outline-secondary action-btn">
                <i className="ion-plus-round"></i>
                &nbsp; Follow {articles[0].author.username}
              </button>
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
                  <a className="nav-link active" href="">
                    My Articles
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">
                    Favorited Articles
                  </a>
                </li>
              </ul>
            </div>
            <Article articles={articles} onGetArticle={onGetArticle} />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
    articles: state.articles.articles,
  });

  const mapDispatchToprops = dispatch => ({
    onGetArticle: (param) => dispatch(getArticles(param))
  })

export default connect(mapStateToProps, mapDispatchToprops)(Profile);
