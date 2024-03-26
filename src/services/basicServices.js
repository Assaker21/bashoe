import axios from "axios";

async function request(method, endpoint, query, payload, useMockApi = false) {
  let url = useMockApi
    ? "http://localhost:3000"
    : "https://bashoe-fty2.onrender.com"; // "http://localhost:3000";
  url = process.env.REACT_APP_API_BASE_URL;
  const res = await axios({
    method,
    url: `${url}/${endpoint}${generateQuery(query)}`,
    data: payload,
    headers: { "Content-Type": "application/json" },
  });
  return [res.status === 200, res.data];
}

function generateQuery(query) {
  return query
    ? Object.keys(query).reduce((acc, key) => {
        return (acc += `${acc ? "&" : "?"}${key}=${query[key]}`);
      }, "")
    : "";
}

export function get(endpoint, query, payload, useMockApi = false) {
  return request("get", endpoint, query, payload, useMockApi);
}

export function post(endpoint, query, payload, useMockApi = false) {
  return request("post", endpoint, query, payload, useMockApi);
}

export function put(endpoint, query, payload, useMockApi = false) {
  return request("put", endpoint, query, payload, useMockApi);
}

export function remove(endpoint, query, payload, useMockApi = false) {
  return request("delete", endpoint, query, payload, useMockApi);
}

export async function uploadFiles(endpoint, query, files) {
  var url = process.env.REACT_APP_API_BASE_URL;
  const formData = new FormData();
  [...files].map((file) => formData.append("files", file));
  const res = await axios({
    method: "post",
    url: `${url}/${endpoint}${generateQuery(query)}`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return [res.status === 200, res.data];
}
