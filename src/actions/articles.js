const axios = require('axios');
export const GET_ARTICLES = 'GET_ARTICLES';

function getArticlesSuccess(articles) {
    return {
        type: GET_ARTICLES,
        articles
    }
};

export function getArticles() {
    return (dispatch) =>
      axios
        .get('https://conduit.productionready.io/api/articles')
        .then((response) => {
            console.log(response.data.articles)
          dispatch(getArticlesSuccess(response.data.articles));
        })
        .catch((error) => {
          console.log(error.errors);
        });
}