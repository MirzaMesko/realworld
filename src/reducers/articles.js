import { GET_ARTICLES, GET_TAGS } from "../actions/articles";

const initialState = {
  articles: [],
  tags: []
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
    return state;
};

export default articles;
