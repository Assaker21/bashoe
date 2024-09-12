import Item from "../item/item.component";

import "./item-list.component.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ItemList({ value }) {
  return (
    <div className="item-list">
      <span className="item-list-title">
        {value?.header || <Skeleton width="300px" />}
      </span>
      <div className="item-list-items">
        {value?.data
          ? value?.data?.map((item, index) => (
              <Item
                navigateTo={`all/product/${item?.sku}`}
                item={item}
                key={`Item: ${item.id} ${index}`}
              />
            ))
          : [1, 2, 3, 4, 5, 6].map((value) => <Item />)}
      </div>
    </div>
  );
}
