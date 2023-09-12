export const FETCH_GET_USER_REQUEST = 'FETCH_GET_USER_REQUEST';
export const FETCH_GET_USER_SUCCESS = 'FETCH_GET_USER_SUCCESS';
export const FETCH_GET_USER_FAILURE = 'FETCH_GET_USER_FAILURE';
export const LOG_OUT_USER = 'LOG_OUT_USER';

export const fetchGetUserRequest = () => ({
  type: FETCH_GET_USER_REQUEST,
});

export const fetchGetUserSuccess = (user) => ({
  type: FETCH_GET_USER_SUCCESS,
  payload: user,
});

export const fetchGetUserFailure = (error) => ({
  type: FETCH_GET_USER_FAILURE,
  payload: error,
});

export const logOutUser = () => ({
  type: LOG_OUT_USER,
});

export const getUser = (token) => {
  return async (dispatch) => {
    dispatch(fetchGetUserRequest());
    try {
      const response = await fetch('https://blog.kata.academy/api/user', {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const data = await response.json();
      dispatch(fetchGetUserSuccess(data));
    } catch (error) {
      dispatch(fetchGetUserFailure(error));
    }
  };
};
