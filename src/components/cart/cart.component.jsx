import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./cart.component.scss";

const Cart = ({ setIsCartOpen, setCart, cart }) => {
  return (
    <>
      <div className="cart-container">
        <div className="top">
          <span className="cart-title">Items ({cart != null ? cart.length : "0"})</span>
          <span
            className="close-button"
            onClick={() => {
              setIsCartOpen(false);
            }}
          >
            <i className="bx bx-x"></i>
          </span>
        </div>

        <div className="items">
          {cart != null &&
            cart.length > 0 &&
            cart.map((item) => (
              <Link
                to={"/item?id=" + item._id}
                key={item.size + item._id + "_top_cart"}
                className="item"
                onClick={() => {
                  setIsCartOpen(false);
                }}
              >
                <img src={item.img[0]} alt="" />
                <span className="item-name">{item.name}</span>
                <span
                  className="x"
                  onClick={() => {
                    const newCart = [...cart];
                    for (var i = 0; i < newCart.length; i++) {
                      if (newCart[i]._id + newCart[i].size == item._id + item.size) {
                        newCart.splice(i, 1);
                        break;
                      }
                    }
                    setCart(newCart);
                  }}
                >
                  <i className="bx bx-x"></i>
                </span>
              </Link>
            ))}
          {(cart == null || cart.length == 0) && <>Nothing here, yet!</>}
        </div>
        <Link
          to="/cart"
          className="checkout-button"
          onClick={() => {
            setIsCartOpen(false);
          }}
        >
          View my cart ({cart != null ? cart.length : "0"})
        </Link>
        {/*<Link
          to="/checkout"
          className="checkout-button"
          onClick={() => {
            setIsCartOpen(false);
          }}
        >
          Checkout
        </Link>*/}
      </div>
    </>
  );
};

export default Cart;
