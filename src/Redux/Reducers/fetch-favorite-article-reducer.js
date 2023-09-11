import {
  FETCH_FAVORITE_ARTICLE_REQUEST,
  FETCH_FAVORITE_ARTICLE_SUCCESS,
  FETCH_FAVORITE_ARTICLE_FAILURE,
} from '../Actions/fetch-favorite-article-action';

const initialState = {
  isLoading: false,
  error: null,
};

export const favoriteArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVORITE_ARTICLE_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_FAVORITE_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_FAVORITE_ARTICLE_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
