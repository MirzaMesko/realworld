const axios = require('axios');
export const GET_ARTICLES = 'GET_ARTICLES';
export const GET_TAGS = 'GET_TAGS';
export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';

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

export function getArticles(param) {
  let url = `https://conduit.productionready.io/api/articles${param}`;
  if (!param) {
    url = `https://conduit.productionready.io/api/articles`
  }
    return (dispatch) =>
      axios
        .get(url)
        .then((response) => {
          dispatch(getArticlesSuccess(response.data.articles));
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
  const headers = { Authorization: `Token ${token}` };
    return (dispatch) =>
      axios
        .get(url, { headers })
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
  console.log({title, description, body, tags, headers})
    return (dispatch) =>
      axios
        .post(url,  article, { headers } )
        .then((response) => {
          console.log(response)
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
  console.log({slug})
    return (dispatch) =>
      axios
        .get(url)
        .then((response) => {
          console.log(response)
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
  console.log({slug})
    return (dispatch) =>
      axios
        .post(url, comment, { headers})
        .then((response) => {
          console.log(response)
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
          console.log(response)
          dispatch(getArticlesSuccess([response.data.article]));
          return response
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
          console.log(response)
          dispatch(getArticlesSuccess([response.data.article]));
          return response
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
          return response
        })
        .catch((error) => {
          console.log(error);
        });
}