export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

export const fetchArticlesRequest = () => ({
  type: FETCH_ARTICLES_REQUEST,
});

export const fetchArticlesSuccess = (articles) => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: articles,
});

export const fetchArticlesFailure = (error) => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: error,
});

export const fetchArticles = (offset) => {
  return async (dispatch) => {
    dispatch(fetchArticlesRequest());
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles?offset=${offset}`);
      const data = await response.json();
      // const articles = data.articles;
      // const articlesCount = data.articlesCount;
      dispatch(fetchArticlesSuccess(data));
    } catch (error) {
      dispatch(fetchArticlesFailure(error));
    }
  };
};
