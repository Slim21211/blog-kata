export const FETCH_ONE_ARTICLE_REQUEST = 'FETCH_ONE_ARTICLE_REQUEST';
export const FETCH_ONE_ARTICLE_SUCCESS = 'FETCH_ONE_ARTICLE_SUCCESS';
export const FETCH_ONE_ARTICLE_FAILURE = 'FETCH_ONE_ARTICLE_FAILURE';

export const fetchOneArticleRequest = () => ({
  type: FETCH_ONE_ARTICLE_REQUEST,
});

export const fetchOneArticleSuccess = (articles) => ({
  type: FETCH_ONE_ARTICLE_SUCCESS,
  payload: articles,
});

export const fetchOneArticleFailure = (error) => ({
  type: FETCH_ONE_ARTICLE_FAILURE,
  payload: error,
});

export const fetchOneArticle = (slug) => {
  return async (dispatch) => {
    dispatch(fetchOneArticleRequest());
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
      const data = await response.json();
      dispatch(fetchOneArticleSuccess(data));
    } catch (error) {
      dispatch(fetchOneArticleFailure(error));
    }
  };
};

export const fetchOneArticleAuth = (slug, token) => {
  return async (dispatch) => {
    dispatch(fetchOneArticleRequest());
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      const data = await response.json();
      dispatch(fetchOneArticleSuccess(data));
    } catch (error) {
      dispatch(fetchOneArticleFailure(error));
    }
  };
};
