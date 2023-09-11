import {
  FETCH_DELETE_ARTICLE_REQUEST,
  FETCH_DELETE_ARTICLE_SUCCESS,
  FETCH_DELETE_ARTICLE_FAILURE,
} from '../Actions/fetch-delete-article-action';

const initialState = {
  isLoading: false,
  error: null,
};

export const deleteArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DELETE_ARTICLE_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_DELETE_ARTICLE_SUCCESS:
      return {
        isLoading: false,
      };
    case FETCH_DELETE_ARTICLE_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
