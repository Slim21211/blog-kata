export const EDIT_ARTICLE_REQUEST = 'EDIT_ARTICLE_REQUEST';
export const EDIT_ARTICLE_SUCCESS = 'EDIT_ARTICLE_SUCCESS';
export const EDIT_ARTICLE_FAILURE = 'EDIT_ARTICLE_FAILURE';

export const editArticleRequest = () => ({
  type: EDIT_ARTICLE_REQUEST,
});

export const editArticleSuccess = (Article) => ({
  type: EDIT_ARTICLE_SUCCESS,
  payload: Article,
});

export const editArticleFailure = (error) => ({
  type: EDIT_ARTICLE_FAILURE,
  payload: error,
});

export const editArticle = (articleData, slug, token) => {
  return async (dispatch) => {
    dispatch(editArticleRequest());
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          article: articleData,
        }),
      });
      if (!response.ok) {
        throw new Error('Edit Article failed');
      } else {
        const article = await response.json();
        dispatch(editArticleSuccess(article));
      }
    } catch (error) {
      dispatch(editArticleFailure(error));
    }
  };
};
