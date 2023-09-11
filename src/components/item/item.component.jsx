import React, { lazy, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./item.component.scss";

const Item = ({ item }) => {
  return (
    <>
      <Link loading="lazy" to={"/item?id=" + item._id} className="item">
        <div className="img-wrapper">
          <img src={item.img[0]} alt="" />
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
