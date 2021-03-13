import {
  GET_ARTICLES,
  GET_TAGS,
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_ARTICLE_SUCCESS,
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED
} from "../actions/articles";

const initialState = {
  articles: [],
  tags: [],
  comments: [],
};

const articles = (state = initialState, action) => {
  if (action.type === GET_ARTICLES) {
    return {
      ...state,
      articles: action.articles,
    };
  }
  if (action.type === GET_TAGS) {
    return {
      ...state,
      tags: action.tags,
    };
  }
  if (action.type === GET_COMMENTS) {
    return {
      ...state,
      comments: action.comments,
    };
  }
  if (action.type === ADD_COMMENT) {
    return {
      ...state,
      comments: state.comments.concat(action.comment),
    };
  }
  if (action.type === DELETE_ARTICLE_SUCCESS) {
    console.log(state.articles, action.slug);
    return {
      ...state,
      articles: state.articles.filter(
        (article) => article.slug !== action.slug
      ),
    };
  }
  if (action.type === DELETE_COMMENT_SUCCESS) {
    return {
      ...state,
      comments: state.comments.filter((comment) => comment.id !== action.id),
    };
  }
  if (action.type === ARTICLE_FAVORITED) {
    let mapped = state.articles.map((article) => {
      if(article.slug === action.article[0].slug) {
        article.favorited = action.article[0].favorited;
        article.favoritesCount = action.article[0].favoritesCount; 
      }
      return article
    })
     return {
       ...state,
       articles: mapped
     }
  }
  if (action.type === ARTICLE_UNFAVORITED) {
    let mapped = state.articles.map((article) => {
      if(article.slug === action.article[0].slug) {
        article.favorited = action.article[0].favorited;
        article.favoritesCount = action.article[0].favoritesCount; 
      }
      return article
    })
     return {
       ...state,
       articles: mapped
     }
  }
  return state;
};

export default articles;
