import { GET_ARTICLES } from "../actions/articles";

const initialState = {
  articles: [],
};

const articles = (state = initialState, action) => {
    if (action.type === GET_ARTICLES) {
        return {
          ...state,
          articles: action.articles
        };
      }
    return state;
};

export default articles;
