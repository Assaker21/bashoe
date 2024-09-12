import CategoryList from "../../components/category-list/category-list.component";
import ItemList from "../../components/item-list/item-list.component";
import WideList from "../../components/wide-list/wide-list.component";

import "./home.page.scss";

import { useState, useEffect } from "react";
import listsServices from "../../services/lists-services";
import contentsServices from "../../services/contents-services";

export default function Home() {
  const [content, setContent] = useState([]);

  async function fetch() {
    const [ok, data] = await contentsServices.getContent({ location: "home" });
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
        console.log("LIST: ", list);
        if (list.type === "Banner")
          return <WideList key={"Home: " + index} value={list} />;
        if (list.type === "List of items")
          return <ItemList key={"Home: " + index} value={list} />;
        if (list.type === "category-list")
          return <>{/*<CategoryList value={list} />*/}</>;
      })}
    </section>
  );
}
