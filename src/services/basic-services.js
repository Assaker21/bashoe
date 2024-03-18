import axios from "axios";

async function request(method, endpoint, query, payload) {
  console.log("endpoint", endpoint, "query", query, "payload", payload);
  console.log(
    "process.env.REACT_APP_API_BASE_URL",
    process.env.REACT_APP_API_BASE_URL
  );
  let url = process.env.REACT_APP_API_BASE_URL;
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

export function get(endpoint, query, payload) {
  return request("get", endpoint, query, payload);
}

export function post(endpoint, query, payload) {
  return request("post", endpoint, query, payload);
}

export function put(endpoint, query, payload) {
  return request("put", endpoint, query, payload);
}

export function remove(endpoint, query, payload) {
  return request("delete", endpoint, query, payload);
}
