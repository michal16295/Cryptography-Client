import axios from "axios";
import globalConstants from "../constants/globalConstants";

const { BASE_API } = globalConstants;

const api = axios.create({
  baseURL: BASE_API,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

export default {
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
};
