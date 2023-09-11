import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://bashoe-api.onrender.com/api/",
  withCredentials: true
});

export default newRequest;
