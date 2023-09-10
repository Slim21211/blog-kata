import {
  CREATE_ARTICLE_REQUEST,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILURE,
} from '../Actions/fetch-create-article-action';

const initialState = {
  article: null,
  isLoading: false,
  error: null,
};

export const createArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ARTICLE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        article: action.payload,
      };
    case CREATE_ARTICLE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
