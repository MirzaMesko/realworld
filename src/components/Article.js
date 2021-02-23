import { NavLink as RouterLink } from "react-router-dom";

function Article(props) {
    const { articles, onGetArticle } = props;
    return articles.map((article) => {
            let date = new Date(article.createdAt);
            return (
              <div className="article-preview" key={article.slug}>
                <div className="article-meta">
                  <RouterLink to="profile.html">
                    <img src={article.author.image} />
                  </RouterLink>
                  <div className="info">
                    <RouterLink to={`/@:${article.author.username}`} className="author" onClick={() => onGetArticle(`/?author=${article.author.username}`)}>
                      {article.author.username}
                    </RouterLink>
                    <span className="date">{date.toDateString()}</span>
                  </div>
                  <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> {article.favoritesCount}
                  </button>
                </div>
                <RouterLink to={`/article/:${article.slug}`} className="preview-link" onClick={() => onGetArticle(`/:${article.slug}`)}>
                  <h1>{article.title}</h1>
                  <p>{article.description}</p>
                  <span>Read more...</span>
                </RouterLink>
              </div>
            );
          })}


export default Article;