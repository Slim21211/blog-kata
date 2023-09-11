import {
  FETCH_ONE_ARTICLE_REQUEST,
  FETCH_ONE_ARTICLE_SUCCESS,
  FETCH_ONE_ARTICLE_FAILURE,
} from '../Actions/fetch-one-article-action';

const initialState = {
  article: {},
  authorUsername: '',
  isLoading: false,
  loaded: false,
  error: null,
};

export const oneArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ONE_ARTICLE_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_ONE_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        article: action.payload,
        authorUsername: action.payload.article.author.username,
      };
    case FETCH_ONE_ARTICLE_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
