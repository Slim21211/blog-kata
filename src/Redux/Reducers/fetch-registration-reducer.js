import { REGISTRATION_REQUEST, REGISTRATION_SUCCESS, REGISTRATION_FAILURE } from '../Actions/fetch-registration-action';
const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case REGISTRATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
