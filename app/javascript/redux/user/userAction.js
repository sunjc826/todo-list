import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "./userTypes";

const usersUrl = "/api/v1/users";

const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});

const fetchUserSuccess = (userData) => ({
  type: FETCH_USER_SUCCESS,
  payload: userData,
});

const fetchUserFailure = (errMsg) => ({
  type: FETCH_USER_FAILURE,
  payload: errMsg,
});

// thunk
const fetchUserData = (dispatch) => (userId) => {
  dispatch(fetchUserRequest());
  const url = `${usersUrl}/${userId}`;
  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((res) => {
      console.log(res);
      fetchUserSuccess(res);
    })
    .catch((err) => {
      console.log(err);
      fetchUserFailure(err.message);
    });
};

export { fetchUserData };
