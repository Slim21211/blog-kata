import {
  FETCH_GET_USER_REQUEST,
  FETCH_GET_USER_SUCCESS,
  FETCH_GET_USER_FAILURE,
  LOG_OUT_USER,
} from '../Actions/fetch-get-user-action';
import {
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  DELETE_ERROR,
} from '../Actions/fetch-edit-user-action';

const initialState = {
  user: {},
  userName: '',
  isLoading: false,
  error: null,
};

export const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GET_USER_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_GET_USER_SUCCESS:
      if (localStorage.getItem('token') === null) {
        localStorage.setItem('token', action.payload.user.token);
      }
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        userName: action.payload.user.username,
      };
    case FETCH_GET_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case LOG_OUT_USER:
      return { ...state, user: {} };
    case EDIT_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case EDIT_USER_SUCCESS:
      if (localStorage.getItem('token') === null) {
        localStorage.setItem('token', action.payload.user.token);
      }
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        userName: action.payload.user.username,
        error: 'no error',
      };
    case EDIT_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case DELETE_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
