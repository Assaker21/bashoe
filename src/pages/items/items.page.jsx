import { useParams } from "react-router-dom";
import { useGeneralContext } from "../../contexts/context.jsx";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component.jsx";
import Item from "../../components/item/item.component.jsx";
import itemsServices from "../../services/itemsServices.js";

import "./items.page.scss";
import { useEffect, useState } from "react";

export default function Items() {
  const { categorySku } = useParams();
  const { getCategoryBySku } = useGeneralContext();
  const category = getCategoryBySku(categorySku);
  const [items, setItems] = useState(null);

  async function getItems() {
    const [ok, data] = await itemsServices.getItems({
      categorySku: categorySku,
    });
    if (ok) {
      setItems(data);
    }
  }

  useEffect(() => {
    setItems(null);
    getItems();
  }, [categorySku]);

  return (
    <section className="items">
      <Breadcrumbs
        items={[
          { name: "Home", to: "/" },
          {
            name: category?.description || "All",
            to: `/${category?.sku}` || "/all",
          },
        ]}
      />
      {items && (
        <div className="items-container">
          {items.map((item, index) => {
            return (
              <Item
                item={item}
                categorySku={categorySku}
                key={`Item: ${index}`}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
