const DEVELOPER_MODE = false;

export const BACKEND_URL = DEVELOPER_MODE
  ? "http://localhost:3000"
  : process.env.REACT_APP_API_BASE_URL; //"https://bashoe-fty2.onrender.com";
