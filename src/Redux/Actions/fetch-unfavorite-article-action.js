export const FETCH_UNFAVORITE_ARTICLE_REQUEST = 'FETCH_UNFAVORITE_ARTICLE_REQUEST';
export const FETCH_UNFAVORITE_ARTICLE_SUCCESS = 'FETCH_UNFAVORITE_ARTICLE_SUCCESS';
export const FETCH_UNFAVORITE_ARTICLE_FAILURE = 'FETCH_UNFAVORITE_ARTICLE_FAILURE';

export const fetchUnfavoriteArticleRequest = () => ({
  type: FETCH_UNFAVORITE_ARTICLE_REQUEST,
});

export const fetchUnfavoriteArticleSuccess = (article) => ({
  type: FETCH_UNFAVORITE_ARTICLE_SUCCESS,
  payload: article,
});

export const fetchUnfavoriteArticleFailure = (error) => ({
  type: FETCH_UNFAVORITE_ARTICLE_FAILURE,
  payload: error,
});

export const fetchUnfavoriteArticle = (slug, token) => {
  return async (dispatch) => {
    dispatch(fetchUnfavoriteArticleRequest());
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      const data = await response.json();
      dispatch(fetchUnfavoriteArticleSuccess(data));
    } catch (error) {
      dispatch(fetchUnfavoriteArticleFailure(error));
    }
  };
};
