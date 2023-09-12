import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  START_REGISTRATION,
} from '../Actions/fetch-registration-action';
const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_REGISTRATION:
      return {
        ...state,
        user: null,
        error: null,
      };
    case REGISTRATION_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: 'no error',
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
