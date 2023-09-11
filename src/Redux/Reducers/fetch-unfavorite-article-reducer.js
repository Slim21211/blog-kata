import {
  FETCH_UNFAVORITE_ARTICLE_REQUEST,
  FETCH_UNFAVORITE_ARTICLE_SUCCESS,
  FETCH_UNFAVORITE_ARTICLE_FAILURE,
} from '../Actions/fetch-unfavorite-article-action';

const initialState = {
  isLoading: false,
  error: null,
};

export const unFavoriteArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UNFAVORITE_ARTICLE_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_UNFAVORITE_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_UNFAVORITE_ARTICLE_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
