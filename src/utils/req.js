import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const newRequest = axios.create({
  baseURL: process.env.SRC,
  withCredentials: true
});

export default newRequest;
