export const FETCH_DELETE_ARTICLE_REQUEST = 'FETCH_DELETE_ARTICLE_REQUEST';
export const FETCH_DELETE_ARTICLE_SUCCESS = 'FETCH_DELETE_ARTICLE_SUCCESS';
export const FETCH_DELETE_ARTICLE_FAILURE = 'FETCH_DELETE_ARTICLE_FAILURE';

export const fetchDeleteArticleRequest = () => ({
  type: FETCH_DELETE_ARTICLE_REQUEST,
});

export const fetchDeleteArticleSuccess = () => ({
  type: FETCH_DELETE_ARTICLE_SUCCESS,
});

export const fetchDeleteArticleFailure = (error) => ({
  type: FETCH_DELETE_ARTICLE_FAILURE,
  payload: error,
});

export const fetchDeleteArticle = (slug, token) => {
  return async (dispatch) => {
    dispatch(fetchDeleteArticleRequest());
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      const data = await response.json();
      dispatch(fetchDeleteArticleSuccess(data));
    } catch (error) {
      dispatch(fetchDeleteArticleFailure(error));
    }
  };
};
