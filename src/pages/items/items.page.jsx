import { useParams } from "react-router-dom";
import { useGeneralContext } from "../../contexts/context.jsx";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component.jsx";
import Item from "../../components/item/item.component.jsx";
import itemsServices from "../../services/items-services.js";
import { useEffect, useState } from "react";

import "./items.page.scss";

export default function Items() {
  const { categorySku } = useParams();
  const { getCategoryBySku } = useGeneralContext();
  const category = getCategoryBySku(categorySku);

  const [items, setItems] = useState(null);

  async function fetch() {
    const [ok, data] = await itemsServices.getItems({ categorySku });
    if (ok) {
      setItems(data);
    }
  }

  useEffect(() => {
    fetch();
  }, [categorySku]);

  return (
    <section className="items">
      <Breadcrumbs
        items={[
          { name: "Home", to: "/" },
          { name: category?.description, to: `/${categorySku}` },
        ]}
      />
      <div className="items-container">
        {items
          ? items?.map((item) => {
              return <Item item={item} key={`Item: ${item.id}`} />;
            })
          : Array.from({ length: 30 }).map((item, index) => (
              <Item key={`Skeleton Item: ${index}`} />
            ))}
      </div>
    </section>
  );
}
