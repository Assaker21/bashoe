import axios from "axios";
import { BACKEND_URL } from "../consts";

async function request(method, endpoint, query, payload, cancelToken) {
  let url = BACKEND_URL;
  const options = {
    method,
    url: `${url}/${endpoint}${generateQuery(query)}`,
    headers: { "Content-Type": "application/json" },
  };

  if (cancelToken) options.cancelToken = cancelToken;
  if (payload) options.data = payload;

  let response;
  try {
    const res = await axios(options);

    response = {
      ok: res.status >= 200 && res.status < 300,
      data: res.data,
      statusCode: res.status,
      message: res.message,
    };
  } catch (error) {
    console.log(error);

    if (error.status == 401) {
      const event = new Event("not-authenticated");
      document.dispatchEvent(event);
    }

    response = {
      ok: false,
      data: error ? error.data : null,
      statusCode: error ? error.status : null,
      message: error.message,
    };
  }

  console.log(
    `${method} /${endpoint}${generateQuery(query)} `,
    "\nPayload: ",
    payload,
    "\nResponse: ",
    response
  );

  return response;
}

function generateQuery(query) {
  return query
    ? Object.keys(query).reduce((acc, key) => {
        return acc + `${acc ? "&" : "?"}${key}=${query[key]}`;
      }, "")
    : "";
}

export function get(endpoint, query, payload, cancelToken) {
  return request("get", endpoint, query, payload, cancelToken);
}

export function post(endpoint, query, payload, cancelToken) {
  return request("post", endpoint, query, payload, cancelToken);
}

export function put(endpoint, query, payload) {
  return request("put", endpoint, query, payload);
}

export function remove(endpoint, query, payload) {
  return request("delete", endpoint, query, payload);
}

export async function uploadFiles(endpoint, query, files) {
  try {
    let url = BACKEND_URL;
    const formData = new FormData();
    [...files].map((file) => formData.append("files", file));

    const promise = axios({
      method: "post",
      url: `${url}/${endpoint}${generateQuery(query)}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    const res = await promise;
    return {
      ok: res.status >= 200 && res.status < 300,
      data: res.data,
      statusCode: res.status,
      message: res.message,
    };
  } catch (error) {
    console.log(error);

    if (error.status == 401) {
      const event = new Event("not-authenticated");
      document.dispatchEvent(event);
    }

    return {
      ok: false,
      data: error ? error.data : null,
      statusCode: error ? error.status : null,
      message: error.message,
    };
  }
}
