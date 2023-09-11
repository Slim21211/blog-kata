export const FETCH_FAVORITE_ARTICLE_REQUEST = 'FETCH_FAVORITE_ARTICLE_REQUEST';
export const FETCH_FAVORITE_ARTICLE_SUCCESS = 'FETCH_FAVORITE_ARTICLE_SUCCESS';
export const FETCH_FAVORITE_ARTICLE_FAILURE = 'FETCH_FAVORITE_ARTICLE_FAILURE';

export const fetchFavoriteArticleRequest = () => ({
  type: FETCH_FAVORITE_ARTICLE_REQUEST,
});

export const fetchFavoriteArticleSuccess = (article) => ({
  type: FETCH_FAVORITE_ARTICLE_SUCCESS,
  payload: article,
});

export const fetchFavoriteArticleFailure = (error) => ({
  type: FETCH_FAVORITE_ARTICLE_FAILURE,
  payload: error,
});

export const fetchFavoriteArticle = (slug, token) => {
  return async (dispatch) => {
    dispatch(fetchFavoriteArticleRequest());
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      const data = await response.json();
      dispatch(fetchFavoriteArticleSuccess(data));
    } catch (error) {
      dispatch(fetchFavoriteArticleFailure(error));
    }
  };
};
