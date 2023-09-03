export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginUser = (userData) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await fetch('https://blog.kata.academy/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userData,
        }),
      });
      if (!response.ok) {
        throw new Error('login failed');
      } else {
        const user = await response.json();
        dispatch(loginSuccess(user));
      }
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };
};
