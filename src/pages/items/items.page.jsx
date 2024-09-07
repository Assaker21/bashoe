import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGeneralContext } from "../../contexts/context.jsx";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component.jsx";
import Item from "../../components/item/item.component.jsx";
import itemsServices from "../../services/items-services.js";
import { useEffect, useMemo, useState } from "react";

import "./items.page.scss";

export default function Items() {
  const { categorySku1, categorySku2, categorySku3, categorySku4 } =
    useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [items, setItems] = useState(null);

  async function fetch() {
    setItems(null);
    const [ok, data] = await itemsServices.getItems({
      categorySku: categorySku4 || categorySku3 || categorySku2 || categorySku1,
    });
    if (ok) {
      if (!data || data?.length == 0) {
        navigate("/all");
      } else {
        setItems(data);
      }
    }
  }

  console.log("LOCATION: ", location);

  useEffect(() => {
    fetch();
  }, [categorySku1, categorySku2, categorySku3, categorySku4]);

  return (
    <section className="items">
      <Breadcrumbs
        items={[
          {
            name: "Home",
            to: "/",
          },
          ...location.pathname
            .slice(1)
            .split("/")
            .map((element, index) => {
              let to = "";
              const elements = location.pathname.split("/");
              for (let i = 0; i < elements.length; i++) {
                to += `/${elements[i]}`;
                if (i == index + 1) {
                  break;
                }
              }
              to = to.replace("//", "/");
              let name = element
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
              return {
                name: name,
                to: to,
              };
            }),
        ]}
      />
      <div className="items-container">
        {items
          ? items?.map((item) => {
              return (
                <Item
                  item={item}
                  key={`Item: ${item.id}`}
                  categorySku={
                    categorySku4 || categorySku3 || categorySku2 || categorySku1
                  }
                />
              );
            })
          : Array.from({ length: 30 }).map((item, index) => (
              <Item key={`Skeleton Item: ${index}`} />
            ))}
      </div>
    </section>
  );
}
