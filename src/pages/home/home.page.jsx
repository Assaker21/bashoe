import CategoryList from "../../components/category-list/category-list.component";
import ItemList from "../../components/item-list/item-list.component";
import WideList from "../../components/wide-list/wide-list.component";

import "./home.page.scss";

import { useState, useEffect } from "react";
import listsServices from "../../services/lists-services";

export default function Home() {
  const [content, setContent] = useState([
    { type: "wide-list" },
    { type: "item-list" },
    { type: "category-list" },
    { type: "wide-list" },
    { type: "item-list" },
    { type: "category-list" },
    { type: "wide-list" },
    { type: "item-list" },
    { type: "category-list" },
  ]);

  async function fetch() {
    const [ok, data] = await listsServices.getLists();
    if (ok) {
      setContent(data);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <section className="home">
      {content?.map((list, index) => {
        if (list.type === "wide-list")
          return <WideList key={"Home: " + index} value={list} />;
        if (list.type === "item-list")
          return <ItemList key={"Home: " + index} value={list} />;
        if (list.type === "category-list")
          return <>{/*<CategoryList value={list} />*/}</>;
      })}
    </section>
  );
}
