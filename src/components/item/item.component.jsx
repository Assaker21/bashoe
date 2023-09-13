import React from "react";
import { Link } from "react-router-dom";
import "./item.component.scss";

const Item = ({ item }) => {
  return (
    <>
      <Link to={"/item?id=" + item._id} className="item">
        <div className="img-wrapper">
          <img loading="lazy" src={item.img[0]} alt="" />
        </div>

        <span className="name">{item.name}</span>
        <span className="cat">{item.cat.toUpperCase()}</span>
        <span className="price">$ {item.price}</span>
        <span className="spacer"></span>
      </Link>
    </>
  );
};

export default Item;
