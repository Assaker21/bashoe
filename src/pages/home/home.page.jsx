import CategoryList from "../../components/category-list/category-list.component";
import ItemList from "../../components/item-list/item-list.component";
import WideList from "../../components/wide-list/wide-list.component";

import "./home.page.scss";

export default function Home() {
  return (
    <section className="home">
      <WideList />
      <ItemList />
      <CategoryList />
      <WideList />
      <ItemList />
      <CategoryList />
      <WideList />
      <ItemList />
      <CategoryList />
      <WideList />
      <ItemList />
      <CategoryList />
    </section>
  );
}
