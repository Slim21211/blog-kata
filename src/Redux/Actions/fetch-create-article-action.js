export const CREATE_ARTICLE_REQUEST = 'CREATE_ARTICLE_REQUEST';
export const CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLE_SUCCESS';
export const CREATE_ARTICLE_FAILURE = 'CREATE_ARTICLE_FAILURE';

export const createArticleRequest = () => ({
  type: CREATE_ARTICLE_REQUEST,
});

export const createArticleSuccess = (article) => ({
  type: CREATE_ARTICLE_SUCCESS,
  payload: article,
});

export const createArticleFailure = (error) => ({
  type: CREATE_ARTICLE_FAILURE,
  payload: error,
});

export const createArticle = (articleData, token) => {
  return async (dispatch) => {
    dispatch(createArticleRequest());
    try {
      const response = await fetch('https://blog.kata.academy/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          article: articleData,
        }),
      });
      if (!response.ok) {
        throw new Error('createArticle failed');
      } else {
        const article = await response.json();
        dispatch(createArticleSuccess(article));
      }
    } catch (error) {
      dispatch(createArticleFailure(error));
    }
  };
};
