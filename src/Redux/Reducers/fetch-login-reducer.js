import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOG_OUT_SESSION } from '../Actions/fetch-login-action';
const initialState = {
  user: null,
  loginToken: '',
  isLoading: false,
  isLoged: false,
  error: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isLoged: true,
        loginToken: action.payload.user.token,
        error: 'no error',
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case LOG_OUT_SESSION:
      return {
        ...state,
        isLoged: false,
        error: null,
      };
    default:
      return state;
  }
};
