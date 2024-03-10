import Item from "../item/item.component";

import "./item-list.component.scss";

export default function ItemList() {
  return (
    <div className="item-list">
      <span className="item-list-title">Recommended For You</span>
      <div className="item-list-items">
        {[1, 2, 3, 4, 5, 6].map((value) => (
          <Item />
        ))}
      </div>
    </div>
  );
}
