export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';

export const registrationRequest = () => ({
  type: REGISTRATION_REQUEST,
});

export const registrationSuccess = (user) => ({
  type: REGISTRATION_SUCCESS,
  payload: user,
});

export const registrationFailure = (error) => ({
  type: REGISTRATION_FAILURE,
  payload: error,
});

export const registrationUser = (userData) => {
  return async (dispatch) => {
    dispatch(registrationRequest());
    try {
      const response = await fetch('https://blog.kata.academy/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userData,
        }),
      });
      if (!response.ok) {
        throw new Error('Registration failed');
      } else {
        const user = await response.json();
        dispatch(registrationSuccess(user));
      }
    } catch (error) {
      dispatch(registrationFailure(error));
    }
  };
};
