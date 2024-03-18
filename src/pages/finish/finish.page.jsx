import "./finish.page.scss";

import ItemList from "../../components/item-list/item-list.component";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useGeneralContext } from "../../contexts/context";

export default function Finish() {
  const { itemList } = useGeneralContext();
  return (
    <section className="finish-page">
      <div className="thank-you-box">
        <CheckCircleIcon fontSize="large" />
        <span>Thank you for your purchase!</span>
        <span>Your order is already on its way!</span>
      </div>
      <div className="more-thanks">
        <span>In the meantime, check out what else we have</span>
      </div>
      <ItemList value={itemList} />
    </section>
  );
}
