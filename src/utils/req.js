import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:1234/api/",
  //baseURL: "https://bashoeapi.onrender.com/api/",
  withCredentials: true,
});

export default newRequest;
