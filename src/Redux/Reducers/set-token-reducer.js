import { SET_TOKEN } from '../Actions/set-token-action';

const initialState = {
  token: '',
};

export const setTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};
