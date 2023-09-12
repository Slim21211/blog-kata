export const START_REGISTRATION = 'START_REGISTRATION';
export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';

export const startRegistration = () => ({
  type: START_REGISTRATION,
});

export const registrationRequest = () => ({
  type: REGISTRATION_REQUEST,
});

export const registrationSuccess = (user) => ({
  type: REGISTRATION_SUCCESS,
  payload: user,
});

export const registrationFailure = (errorMessage) => ({
  type: REGISTRATION_FAILURE,
  payload: errorMessage,
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
      if (response.status === 422) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.errors;
        dispatch(registrationFailure(errorMessage));
      } else if (!response.ok) {
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
