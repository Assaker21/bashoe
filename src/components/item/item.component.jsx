import "./item.component.scss";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Item() {
  const images = [
    "https://images.stockx.com/images/Air-Jordan-1-High-OG-Black-White-Product.jpg?fit=fill&bg=FFFFFF&w=140&h=75&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1707164705&q=57",
    "https://images.stockx.com/images/Crocs-Classic-Clog-Lightning-McQueen-Product.jpg?fit=fill&bg=FFFFFF&w=140&h=75&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1620405722&q=57",
    "https://images.stockx.com/images/Nike-Dunk-Low-Photon-Dust-W-Product.jpg?fit=fill&bg=FFFFFF&w=140&h=75&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1620404906&q=57",
    "https://images.stockx.com/images/Air-Jordan-1-Mid-Light-Smoke-Grey-Product.jpg?fit=fill&bg=FFFFFF&w=140&h=75&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1606319491&q=57",
  ];

  const category = {
    sku: "sneakers",
    description: "Sneakers",
  };

  const name = "Jordan 4 Retro Bred Reimagined (GS)";
  const sku = name.toLowerCase().replaceAll(" ", "-");

  const [image, setImage] = useState(
    images[Math.floor(Math.random() * images.length)]
  );

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/${category.sku}/${sku}`);
  }

  return (
    <div className="list-item" onClick={handleClick}>
      <img src={image} alt="shoe" className="list-item-image" />
      <span className="list-item-name">{name}</span>
      <span className="list-item-category">{category.description}</span>
      <span className="list-item-price">$79</span>
    </div>
  );
}
