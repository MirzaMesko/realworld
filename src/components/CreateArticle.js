import React, {useState} from 'react';
import { connect } from "react-redux";
import { createArticle} from '../actions/articles';

function CreateArticle(props) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');

    const { token, onCreateArticle, history } = props;

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    };

    const handleBodyChange = (event) => {
        setBody(event.target.value)
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    };

    const handleTagsChange = (event) => {
        setTags(event.target.value)
    };

    const create = (event) => {
        event.preventDefault();
        onCreateArticle(token, title, description, body, tags).then((response) => {
            history.push(`/article/${response.data.article.slug}`);
          });
    }

    return (
        <div className="editor-page">
        <div className="container page">
          <div className="row">
      
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form onSubmit={create}>
                <fieldset>
                  <fieldset className="form-group">
                      <input type="text" className="form-control form-control-lg" placeholder="Article Title" onChange={handleTitleChange}/>
                  </fieldset>
                  <fieldset className="form-group">
                      <input type="text" className="form-control" placeholder="What's this article about?" onChange={handleDescriptionChange}/>
                  </fieldset>
                  <fieldset className="form-group">
                      <textarea className="form-control" rows="8" placeholder="Write your article (in markdown)"onChange={handleBodyChange}></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                      <input type="text" className="form-control" placeholder="Enter tags" onChange={handleTagsChange}/><div className="tag-list"></div>
                  </fieldset>
                  <button className="btn btn-lg pull-xs-right btn-primary" >
                      Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
      
          </div>
        </div>
      </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.users.token
  });

const mapDispatchToProps = dispatch => ({
    onCreateArticle: (token, title, description, body, tags) => dispatch(createArticle(token, title, description, body, tags))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);