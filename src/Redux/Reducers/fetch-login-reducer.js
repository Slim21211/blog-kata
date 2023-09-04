import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../Actions/fetch-login-action';
const initialState = {
  user: null,
  token: '',
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
      };
    case LOGIN_SUCCESS:
      console.log('fff', action.payload);
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        token: action.payload.user.token,
        isLoged: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
