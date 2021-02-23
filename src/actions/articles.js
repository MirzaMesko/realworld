const axios = require('axios');
export const GET_ARTICLES = 'GET_ARTICLES';
export const GET_TAGS = 'GET_TAGS';

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



export function getArticles(param) {
  let url = `https://conduit.productionready.io/api/articles${param}`;
  if (!param) {
    url = `https://conduit.productionready.io/api/articles`
  }
    return (dispatch) =>
      axios
        .get(url)
        .then((response) => {
            console.log(response.data.articles)
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
            console.log(response.data.tags)
          dispatch(getTagsSuccess(response.data.tags));
        })
        .catch((error) => {
          console.log(error);
        });
}