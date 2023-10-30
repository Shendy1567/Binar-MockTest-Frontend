import Axios from "axios";
const axiosUrl = "http://localhost:4000/";

Axios.defaults.withCredentials = true;
const axios = Axios.create({
  baseURL: axiosUrl,
});

export default axios;
