import axios from "axios";
const {
  REACT_APP_BASE_API_URL: BASE_URL,
} = process.env;

export const createUser = (userInfo) => {
  const params = {
    url: `${BASE_URL}/v1/users/`,
    method: "post",
    data: userInfo,
  };
  return axios.request(params);
};

export const login = (credentials) => {
  const params = {
    url: `${BASE_URL}/v1/login`,
    method: "post",
    data: credentials,
  };
  return axios.request(params);
};

// export default { createUser, login };
