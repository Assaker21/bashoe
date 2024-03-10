import Category from "../category/category.component";

import "./category-list.component.scss";

export default function CategoryList() {
  return (
    <div className="category-list">
      <span className="category-list-title">Popular Brands</span>
      <div className="category-list-items">
        {[1, 2, 3, 4, 5].map((value) => (
          <Category />
        ))}
      </div>
    </div>
  );
}
