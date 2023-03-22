import Axios from 'axios';

export const axios = Axios.create({
  baseURL: "/api",
});

axios.interceptors.response.use(
  undefined,
  (error) => {
    return Promise.reject(error);
  }
);