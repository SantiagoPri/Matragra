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

export const getProjectByName = (jwt, projectName) => {
  const params = {
    url: `${BASE_URL}/v1/project/${projectName}`,
    headers: { Authorization: jwt },
    method: "get",
  };
  return axios.request(params);
};

export const getProjectByPhase = (jwt, projectName, index) => {
  const params = {
    url: `${BASE_URL}/v1/projectDetail/${projectName}/phase${index}`,
    headers: { Authorization: jwt },
    method: "get",
  };
  return axios.request(params);
};

export const putProjectPhase = (jwt, projectName, phase, phaseInfo) => {
  const params = {
    url: `${BASE_URL}/v1/projectDetail/${projectName}/phase${phase}`,
    headers: { Authorization: jwt },
    method: "put",
    data: phaseInfo,
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

export const putProject = (jwt, projectName, index) => {
  const params = {
    url: `${BASE_URL}/v1/projects/${projectName}`,
    headers: { Authorization: jwt },
    method: "put",
    data: { index },
  };
  return axios.request(params);
};

export const saveFileInS3Bucket = (
  jwt,
  file,
  contentType,
  fileName,
  projectName
) => {
  const params = {
    url: `${BASE_URL}/v1/file/`,
    headers: { Authorization: jwt },
    method: "post",
    data: {
      file,
      contentType,
      fileName,
      projectName,
    },
  };
  return axios.request(params);
};

export const getProjectMembers = (jwt, projectName) => {
  const params = {
    url: `${BASE_URL}/v1/projects/users/${projectName}`,
    headers: { Authorization: jwt },
    method: "get",
  };
  return axios.request(params);
};

export const foroList = (jwt, projectName) => {
  const params = {
    url: `${BASE_URL}/v1/foros/${projectName}`,
    headers: { Authorization: jwt },
    method: "get",
  };
  return axios.request(params);
};
