import axios from "axios";
const { REACT_APP_BASE_API_URL: BASE_URL } = process.env;

export const createUser = (userInfo) => {
  const params = {
    url: `${BASE_URL}/v1/users`,
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

export const getProjects = (jwt) => {
  const params = {
    url: `${BASE_URL}/v1/projects`,
    headers: { Authorization: jwt },
    method: "get",
  };
  return axios.request(params);
};

export const getProject = (jwt, projectName, index) => {
  const params = {
    url: `${BASE_URL}/v1/projectDetail/${projectName}/phase${index}`,
    headers: { Authorization: jwt },
    method: "get",
  };
  return axios.request(params);
};

export const newProject = (jwt, projectInfo) => {
  const params = {
    url: `${BASE_URL}/v1/projects/`,
    headers: { Authorization: jwt },
    method: "post",
    data: projectInfo,
  };
  return axios.request(params);
};
