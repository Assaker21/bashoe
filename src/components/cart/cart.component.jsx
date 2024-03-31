import { useGeneralContext } from "../../contexts/context.jsx";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Line from "../../basic-components/line/line.component.jsx";

import "./cart.component.scss";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cart({ setMenuOpen }) {
  const { cart, setCart, calculateTotal, calculateSubtotal } =
    useGeneralContext();

  const navigate = useNavigate();

  return (
    <section className="cart-menu">
      <span className="cart-menu-title">Your cart ({cart.length})</span>
      <div className="cart-menu-items">
        {cart?.map((cartItem, index) => (
          <>
            <CartItem
              items={cart}
              setCart={setCart}
              setItems={setCart}
              index={index}
            />
            <Line />
          </>
        )) || "Nothing in your cart, yet!"}
      </div>
      <div className="cart-menu-bottom">
        <div className="cart-menu-totals">
          <div className="cart-menu-total">
            <span>Subtotal</span>
            <span>${calculateSubtotal().toFixed(1)}</span>
          </div>
          <div className="cart-menu-total">
            <span>Shipping</span>
            <span>${cart.length > 0 ? "4.0" : "0.0"}</span>
          </div>
          <div className="cart-menu-total">
            <span>Total</span>
            <span>
              ${cart.length > 0 ? calculateTotal().toFixed(1) : "0.0"}
            </span>
          </div>
        </div>
        <button
          to="checkout"
          onClick={() => {
            if (cart.length > 0) {
              setMenuOpen(false);
              navigate("checkout");
            }
          }}
          className="cart-menu-button"
        >
          Checkout
        </button>
      </div>
    </section>
  );
}

function CartItem({ items, setItems, index, setCart }) {
  return (
    <div className="cart-menu-item">
      <img
        className="cart-menu-item-image"
        src={items[index].item?.images[0].url.replace("<number>", "01")}
      />
      <span className="cart-menu-item-name">{items[index].item?.name}</span>
      <span className="cart-menu-item-variant">
        {items[index].item?.itemVariantGroups[0].description}:{" "}
        {items[index].variant?.description}
      </span>
      <div className="cart-menu-item-price-and-quantity">
        <span className="cart-menu-item-price">
          ${items[index].item?.price}
        </span>
        <div className="cart-menu-item-quantity">
          <IconButton
            onClick={() => {
              if (items[index].quantity > 1) {
                const newItems = [...items];
                newItems[index].quantity--;
                setItems(newItems);
              }
            }}
          >
            <RemoveIcon />
          </IconButton>
          <input
            type="number"
            value={items[index]?.quantity}
            onChange={(e) => {
              if (e.target.value > 0) {
                const newItems = [...items];
                newItems[index].quantity = e.target.value;
                setItems(newItems);
              }
            }}
          />
          <IconButton
            onClick={() => {
              const newItems = [...items];
              newItems[index].quantity++;
              setItems(newItems);
            }}
          >
            <AddIcon />
          </IconButton>
        </div>
      </div>
      <IconButton
        className="cart-menu-item-close"
        onClick={() => {
          const newItems = [...items];
          newItems.splice(index, 1);
          setCart(newItems);
        }}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
}
