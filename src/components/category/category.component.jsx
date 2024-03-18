import "./category.component.scss";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Category({ value }) {
  const c =
    "https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt409de50cb3a5a1b3/6549194da6e009040a741042/jordan.jpg?auto=webp&format=pjpg&width=234&height=160&dpr=1&quality=80";

  if (value)
    return (
      <div className="list-category">
        <img className="list-category-image" src={value?.url} />
        <span className="list-category-name">{value?.description}</span>
      </div>
    );

  return (
    <Skeleton
      height={140}
      className="list-category"
      style={{ width: "100%" }}
    />
  );
}
