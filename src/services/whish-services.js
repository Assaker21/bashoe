import axios from "axios";

async function request(method, endpoint, payload) {
  let url = "https://lb.sandbox.whish.money/itel-service/api";
  axios.interceptors.request.use(
    (config) => {
      config.headers = {
        "Content-Type": "application/json",
      };
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const res = await axios({
    method,
    url: `${url}/${endpoint}`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return [res.status >= 200 && res.status < 300, res.data];
}

async function whishToWhish(data) {
  return request("post", "payment/whish", data);
}

async function getBalance(data) {
  return request("get", "payment/account/balance", data); //https://lb.sandbox.whish.money/itel-service/api/payment/account/balance
}

export default {
  whishToWhish,
  getBalance,
};
