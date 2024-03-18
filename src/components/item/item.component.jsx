import "./item.component.scss";

import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Item({ item }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/${item?.categories[0].sku}/${item?.sku}`);
  }

  return (
    <div className="list-item" onClick={handleClick}>
      {item?.images[0] ? (
        <img
          src={item?.images[0].url.replace("<number>", "01")}
          alt="shoe"
          className="list-item-image"
        />
      ) : (
        <Skeleton height="100px" />
      )}
      <span className="list-item-name">{item?.name || <Skeleton />}</span>
      <span className="list-item-category">
        {item?.categories[0].description || <Skeleton />}
      </span>
      <span className="list-item-price">
        {(item?.price && `$${item?.price}`) || <Skeleton />}
      </span>
    </div>
  );
}
