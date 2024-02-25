import { useGeneralContext } from "../../contexts/context.jsx";

import "./cart.component.scss";

export default function Cart() {
  const { cart } = useGeneralContext();
  return (
    <div>
      {cart?.map((cartItem) => JSON.stringify(cartItem)) ||
        "Nothing in your cart, yet!"}
    </div>
  );
}
