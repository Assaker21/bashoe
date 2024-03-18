import "./item.component.scss";

import { useNavigate } from "react-router-dom";
import SelectItem from "../select-item/select-item.component";
import { useGeneralContext } from "../../contexts/context";
import { useState } from "react";

export default function Item({ item, onChange, categorySku, edit }) {
  const navigate = useNavigate();
  const { items } = useGeneralContext();

  function handleClick() {
    if (!item || edit) return;
    navigate(`/${categorySku}/${item?.sku}`);
  }

  return (
    <div className="list-item" onClick={handleClick}>
      {edit && (
        <SelectItem
          items={items}
          value={JSON.stringify(item) || ""}
          onChange={(value) => {
            console.log("Value: ", value);
            onChange(value);
          }}
        />
      )}
      {!edit && item !== "" && (
        <>
          <img
            src={item?.images[0].url.replace("<number>", "01")}
            alt="shoe"
            className="list-item-image"
          />
          <span className="list-item-name">{item?.name}</span>
          <span className="list-item-category">
            {item?.categories[0].description}
          </span>
          <span className="list-item-price">${item?.price}</span>
        </>
      )}
    </div>
  );
}
