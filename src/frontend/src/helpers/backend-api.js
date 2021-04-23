import axios from "axios";
const {
  REACT_APP_API_KEY: API_KEY,
  REACT_APP_BASE_API_URL: BASE_URL,
} = process.env;

const createUser = (userInfo) => {
  const params = {
    headers: { "x-api-key": API_KEY },
    url: `${BASE_URL}/users/`,
    method: "post",
    data: userInfo,
  };
  return axios.request(params);
};

const login = (credentials) => {
  const params = {
    headers: { "x-api-key": API_KEY },
    url: `${BASE_URL}/login/`,
    method: "post",
    data: credentials,
  };
  return axios.request(params);
};

export default { createUser, login };
