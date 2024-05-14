import "./finish.page.scss";

import ItemList from "../../components/item-list/item-list.component";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useGeneralContext } from "../../contexts/context";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import ordersService from "../../services/orders-service";

export default function Finish() {
  const { itemList, setCart } = useGeneralContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [doOnce, setDoOnce] = useState(true);

  useEffect(() => {
    if (searchParams.get("status") === "success" && doOnce) {
      setDoOnce(false);
      closeOrder({
        ...JSON.parse(localStorage.getItem("order")),
        externalId: localStorage.getItem("externalId"),
      });
    }
  }, []);

  async function closeOrder(order) {
    const [ok, data] = await ordersService.createOrder(order);
    if (ok) {
      console.log("Response: ", data);
      setCart([]);
      localStorage.removeItem("order");
      localStorage.removeItem("externalId");
    } else {
      console.log("ERROR: ", data);
    }
  }

  return (
    <section className="finish-page">
      {searchParams.get("status") === "success" && (
        <>
          <div className="thank-you-box">
            <CheckCircleIcon fontSize="large" />
            <span>Thank you for your purchase!</span>
            <span>Your order is already on its way!</span>
          </div>
          <div className="more-thanks">
            <span>In the meantime, check out what else we have</span>
          </div>
          <ItemList value={itemList} />
        </>
      )}
      {searchParams.get("status") === "fail" && (
        <>
          <div className="thank-you-box">
            <DisabledByDefaultIcon fontSize="large" />
            <span>Sorry, your purchase did not go through</span>
            <span>
              <Link to="/checkout">Try again here</Link>
            </span>
          </div>
        </>
      )}
    </section>
  );
}
