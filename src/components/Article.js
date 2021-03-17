import { NavLink as RouterLink } from "react-router-dom";

function Article(props) {
  const {
    articles,
    onGetArticle,
    onGetProfile,
    onFavoriteArticle,
    onUnfavoriteArticle,
    token,
    onShowLoading,
    loading
  } = props;

  const getUserInfo = (username) => {
    onShowLoading();
    onGetProfile(username);
    onGetArticle(`author=${username}`, 10);
    ;
  };

  if (loading) {
    return <div className="article-preview"></div>
  }

  if (!articles.length) {
    return <p className="article-preview">No articles are here... yet.</p>;
  }
  return articles.map((article) => {
    let date = new Date(article.createdAt);
    return (
      <div className="article-preview" key={article.slug}>
        <div className="article-meta">
          <RouterLink to="profile.html">
            <img src={article.author.image} />
          </RouterLink>
          <div className="info">
            <RouterLink
              to={`/@:${article.author.username}`}
              className="author"
              onClick={() => getUserInfo(`${article.author.username}`)}
            >
              {article.author.username}
            </RouterLink>
            <span className="date">{date.toDateString()}</span>
          </div>
          {article.favorited === false && token ? (
            <button
              className="btn btn-outline-primary btn-sm pull-xs-right"
              onClick={() => onFavoriteArticle(token, article.slug)}
            >
              <i className="ion-heart"></i> {article.favoritesCount}
            </button>
          ) : (
            <button
              className="btn btn-outline-primary btn-sm pull-xs-right"
              onClick={() => onUnfavoriteArticle(token, article.slug)}
            >
              <i className="ion-heart"></i> {article.favoritesCount}
            </button>
          )}
        </div>
        <RouterLink
          to={`/article/:${article.slug}`}
          className="preview-link"
          onClick={() => onGetProfile(`${article.author.username}`)}
        >
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <span>Read more...</span>
        </RouterLink>
      </div>
    );
  });
}

export default Article;
