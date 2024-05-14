import { post } from "./basic-services";

function requestPayment(payload) {
  return post("payments/pay", null, payload);
}

export default {
  requestPayment,
};
