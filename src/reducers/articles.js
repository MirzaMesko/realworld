import { GET_ARTICLES, GET_TAGS, GET_COMMENTS, ADD_COMMENT } from "../actions/articles";

const initialState = {
  articles: [],
  tags: [],
  comments: []
};

const articles = (state = initialState, action) => {
    if (action.type === GET_ARTICLES) {
        return {
          ...state,
          articles: action.articles
        };
      }
      if (action.type === GET_TAGS) {
        return {
          ...state,
          tags: action.tags
        };
      }
      if (action.type === GET_COMMENTS) {
        return {
          ...state,
          comments: action.comments
        };
      }
      if (action.type === ADD_COMMENT) {
        return {
          ...state,
          comments: state.comments.concat(action.comment)
        };
      }
    return state;
};

export default articles;
