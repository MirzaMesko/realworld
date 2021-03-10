import React, { useState } from "react";
import { connect } from "react-redux";
import { createArticle, editArticle } from "../actions/articles";

function CreateArticle(props) {
  const {
    token,
    onCreateArticle,
    history,
    match,
    articles,
    onEditArticle,
  } = props;
  let article = [];
  if (match.params.id) {
    article = articles.filter(
      (item) => `:${item.slug}` == match.params.id.slice(1)
    );
  }

  console.log(article);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const create = (event) => {
    event.preventDefault();
    onCreateArticle(token, title, description, body, tags).then((response) => {
      history.push(`/article/${response.data.article.slug}`);
    });
  };

  const edit = (event) => {
    event.preventDefault();
    onEditArticle(token, title, description, body, article[0].slug).then((response) => {
      history.push(`/article/${response.data.article.slug}`);
    });
  };

  React.useEffect(() => {
    if (article.length) {
      setTitle(article[0].title);
      setBody(article[0].body);
      setDescription(article[0].description);
      setTags(article[0].tagList);
    } else {
      setTitle("");
      setBody("");
      setDescription("");
      setTags("");
    }
  }, []);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form onSubmit={match.params.id ? edit : create}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    onChange={handleTitleChange}
                    value={title}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    onChange={handleDescriptionChange}
                    value={description}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    onChange={handleBodyChange}
                    value={body}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    onChange={handleTagsChange}
                    value={tags}
                  />
                  <div className="tag-list"></div>
                </fieldset>
                <button className="btn btn-lg pull-xs-right btn-primary">
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.users.token,
  articles: state.articles.articles,
});

const mapDispatchToProps = (dispatch) => ({
  onCreateArticle: (token, title, description, body, tags) =>
    dispatch(createArticle(token, title, description, body, tags)),
  onEditArticle: (token, article, description, body, slug) =>
    dispatch(editArticle(token, article, description, body, slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
