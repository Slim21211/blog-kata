export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOG_OUT_SESSION = 'LOG_OUT_SESSION;';

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

export const logOutSession = () => ({
  type: LOG_OUT_SESSION,
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
      if (response.status === 422) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.errors;
        dispatch(loginFailure(errorMessage));
      } else {
        const user = await response.json();
        dispatch(loginSuccess(user));
      }
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };
};
