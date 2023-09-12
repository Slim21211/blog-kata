export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';

export const editUserRequest = () => ({
  type: EDIT_USER_REQUEST,
});

export const editUserSuccess = (user) => ({
  type: EDIT_USER_SUCCESS,
  payload: user,
});

export const editUserFailure = (error) => ({
  type: EDIT_USER_FAILURE,
  payload: error,
});

export const editUser = (userData, token) => {
  return async (dispatch) => {
    dispatch(editUserRequest());
    try {
      const response = await fetch('https://blog.kata.academy/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          user: userData,
        }),
      });
      if (response.status === 422) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.errors;
        dispatch(editUserFailure(errorMessage));
      } else {
        const user = await response.json();
        dispatch(editUserSuccess(user));
      }
    } catch (error) {
      dispatch(editUserFailure(error));
    }
  };
};
