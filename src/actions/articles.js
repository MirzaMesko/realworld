const axios = require('axios');
export const GET_ARTICLES = 'GET_ARTICLES';
export const GET_TAGS = 'GET_TAGS';
export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS';
export const ARTICLE_FAVORITED = 'ARTICLE_FAVORITED';
export const ARTICLE_UNFAVORITED = 'ARTICLE_UNFAVORITED';

function getArticlesSuccess(articles) {
    return {
        type: GET_ARTICLES,
        articles
    }
};

function getTagsSuccess(tags) {
  return {
      type: GET_TAGS,
      tags
  }
};

function getCommentsSuccess(comments) {
  return {
    type: GET_COMMENTS,
    comments
  }
}

function addCommentSuccess(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

function deleteCommentSuccess(id) {
  return { 
    type: DELETE_COMMENT_SUCCESS,
    id
  }
}

function deleteArticleSuccess(slug) {
  return {
    type: DELETE_ARTICLE_SUCCESS,
    slug
  }
}

function articleFavorited(article) {
  return {
    type: ARTICLE_FAVORITED,
    article
  }
}

function articleUnfavorited(article) {
  return {
    type: ARTICLE_UNFAVORITED,
    article
  }
}


export function getArticles(param) {
  let url = `https://conduit.productionready.io/api/articles${param}`;
  if (!param) {
    url = `https://conduit.productionready.io/api/articles`
  }
    return (dispatch) =>
      axios
        .get(url)
        .then((response) => {
          if(!response.data.articles) {
            dispatch(getArticlesSuccess([response.data.article]));
          } else {
            dispatch(getArticlesSuccess(response.data.articles));
          }
          
        })
        .catch((error) => {
          console.log(error);
        });
}

export function getTags() {
    let url = `https://conduit.productionready.io/api/tags`;
    return (dispatch) =>
      axios
        .get(url)
        .then((response) => {
          dispatch(getTagsSuccess(response.data.tags));
        })
        .catch((error) => {
          console.log(error);
        });
}

export function getFeed(token) {
  let url = `https://conduit.productionready.io/api/articles/feed`;
  const headers = { 'Content-Type': 'application/json', 'Authorization' : `Token ${token}` };
    return (dispatch) =>
      axios
        .get(url, {}, { headers })
        .then((response) => {
          dispatch(getArticlesSuccess(response.data.articles));
        })
        .catch((error) => {
          console.log(error);
        });
}

export function createArticle(token, title, description, body, tags) {
  let url = `https://conduit.productionready.io/api/articles`;
  const headers = { 'Content-Type': 'application/json', 'Authorization' : `Token ${token}` };
  const article = {title, description, body, tagList: [tags]}
    return (dispatch) =>
      axios
        .post(url,  article, { headers } )
        .then((response) => {
          dispatch(getArticlesSuccess([response.data.article]));
          getComments(token, response.data.article.slug)
          return response
        })
        .catch((error) => {
          console.log(error);
        });
}

export function getComments(token, slug) {
  let url = 'https://conduit.productionready.io/api/articles/' + slug + '/comments';
    return (dispatch) =>
      axios
        .get(url)
        .then((response) => {
          dispatch(getCommentsSuccess(response.data.comments));
          return response
        })
        .catch((error) => {
          console.log(error);
        });
}

export function addComment(token, slug, body) {
  let url = 'https://conduit.productionready.io/api/articles/' + slug + '/comments';
  const headers = { 'Content-Type': 'application/json', 'Authorization' : `Token ${token}` };
  const comment = { body }
    return (dispatch) =>
      axios
        .post(url, comment, { headers})
        .then((response) => {
          dispatch(addCommentSuccess(response.data.comment));
          return response
        })
        .catch((error) => {
          console.log(error);
        });
}

export function favoriteArticle(token, slug) {
  let url = 'https://conduit.productionready.io/api/articles/' + slug + '/favorite';
  const headers = { 'Content-Type': 'application/json', 'Authorization' : `Token ${token}` };
    return (dispatch) =>
      axios
        .post(url, {}, {headers} )
        .then((response) => {
          dispatch(articleFavorited([response.data.article]))
        })
        .catch((error) => {
          console.log(error);
        });
}

export function unfavoriteArticle(token, slug) {
  let url = 'https://conduit.productionready.io/api/articles/' + slug + '/favorite';
  const headers = { 'Content-Type': 'application/json', 'Authorization' : `Token ${token}` };
    return (dispatch) =>
      axios
        .delete(url, {headers}, {params: {} } )
        .then((response) => {
          dispatch(articleUnfavorited([response.data.article]))
        })
        .catch((error) => {
          console.log(error);
        });
}

export function deleteArticle(token, slug) {
  let url = 'https://conduit.productionready.io/api/articles/' + slug;
  const headers = { 'Content-Type': 'application/json', 'Authorization' : `Token ${token}` };
    return (dispatch) =>
      axios
        .delete(url, {headers}, {params: {} } )
        .then((response) => {
          dispatch(deleteArticleSuccess(slug))
        })
        .catch((error) => {
          console.log(error);
        });
}

export function editArticle(token, title, description, body, slug) {
  let url = 'https://conduit.productionready.io/api/articles/' + slug;
  const headers = { 'Content-Type': 'application/json', 'Authorization' : `Token ${token}` };
    return (dispatch) =>
      axios
        .put(url, {title, description, body}, {headers} )
        .then((response) => {
          dispatch(getArticlesSuccess([response.data.article]));
          getComments(token, response.data.article.slug)
          return response
        })
        .catch((error) => {
          console.log(error);
        });
}

export function deleteComment(token, slug, id) {
  let url = `https://conduit.productionready.io/api/articles/${slug}/comments/${id}`;
  const headers = { 'Content-Type': 'application/json', 'Authorization' : `Token ${token}` };
    return (dispatch) =>
      axios
        .delete(url, {headers}, {params: {} } )
        .then((response) => {
          dispatch(deleteCommentSuccess(id))
        })
        .catch((error) => {
          console.log(error);
        });
}