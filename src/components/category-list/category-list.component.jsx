import Category from "../category/category.component";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "./category-list.component.scss";

export default function CategoryList({ value }) {
  return (
    <div className="category-list">
      <span className="category-list-title">
        {value?.description || <Skeleton width="300px" />}
      </span>
      {!value?.content ? (
        <Skeleton height={140} width="100%" />
      ) : (
        <div className="category-list-items">
          {value?.content?.map((cat) => (
            <Category value={cat} />
          ))}
        </div>
      )}
    </div>
  );
}
