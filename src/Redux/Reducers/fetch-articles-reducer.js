import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
} from '../Actions/fetch-articles-action';

const initialState = {
  articles: [],
  articlesCount: 0,
  isLoading: false,
  error: null,
};

export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
      };
    case FETCH_ARTICLES_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
