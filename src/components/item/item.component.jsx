import "./item.component.scss";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Item({ item, categorySku }) {
  if (!item) {
    return "item";
  }

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/${categorySku}/${item.sku}`);
  }

  return (
    <div className="list-item" onClick={handleClick}>
      <img
        src={item.images[0].url.replace("<number>", "01")}
        alt="shoe"
        className="list-item-image"
      />
      <span className="list-item-name">{item.name}</span>
      <span className="list-item-category">
        {item.categories[0].description}
      </span>
      <span className="list-item-price">${item.price}</span>
    </div>
  );
}
