import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./cart.page.scss";

const Cart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [shippingFee, setShippingFee] = useState(localStorage.getItem("shippingFee") ? Number(localStorage.getItem("shippingFee")) : 0);

  useEffect(() => {
    window.addEventListener("cats&shipping", () => {
      setShippingFee(JSON.parse(localStorage.getItem("shippingFee")));
    });
  }, []);

  useEffect(() => {
    if (cart) {
      var tot = 0;
      if (cart) {
        for (var i = 0; i < cart.length; i++) {
          tot += cart[i].price * cart[i].quantity;
        }
      }

      setTotal(tot);

      if (localStorage.getItem("cart") != JSON.stringify(cart)) {
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("storage"));
      }
    } else {
      setTotal(0);
      if (cart != null || localStorage.getItem != null) {
        localStorage.setItem("cart", null);
        window.dispatchEvent(new Event("storage"));
      }
    }
    return () => {
      localStorage.setItem("cart", JSON.stringify(cart));
    };
  }, [cart]);

  var tot = 0;
  if (cart) {
    for (var i = 0; i < cart.length; i++) {
      tot += cart[i].price * cart[i].quantity;
    }
  }

  const [total, setTotal] = useState(tot);

  const addToCart = async (item) => {
    setCart((currentCart) => {
      var newCart = [];

      if (currentCart) {
        newCart = [...currentCart];

        for (var i = 0; i < newCart.length; i++) {
          if (newCart[i]._id + newCart[i].size == item._id + item.size) {
            newCart[i].quantity = item.quantity;
            return newCart;
          }
        }
      }

      return newCart;
    });
  };

  return (
    <>
      <div className="cart-page">
        <div className="cart-page-items">
          {cart != null &&
            cart.length > 0 &&
            cart.map((item) => {
              return (
                <div key={item.name + item.size + item._id} className="cart-page-item">
                  <Link to={"/item?id=" + item._id} className="cart-page-item-img-info">
                    <img src={item.img[0]} alt="" className="cart-page-item-img" />
                    <div className="cart-page-item-info">
                      <span className="cart-page-item-name">{item.name}</span>
                      <span className="cart-page-item-size">{item.size}</span>
                    </div>
                  </Link>
                  <div className="cart-page-qnt-remove">
                    <button
                      className="cart-page-remove"
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
                      <i className="bx bx-trash"></i>
                    </button>
                    <input
                      type="number"
                      min="1"
                      className="cart-page-qnt"
                      defaultValue={item.quantity}
                      onChange={(e) => {
                        item.quantity = Number(e.target.value);
                        addToCart(item);
                      }}
                    />
                    <span className="cart-page-item-price">$ {item.price}</span>
                  </div>
                </div>
              );
            })}

          {(cart == null || cart.length == 0) && <>Nothing to see here, yet!</>}
        </div>
        <hr />

        <div className="cart-page-totals">
          <div className="cart-page-totals-item">
            <span className="totals-label">Subtotal</span>
            <span className="totals-value">$ {total}</span>
          </div>
          <div className="cart-page-totals-item">
            <span className="totals-label">Shipping</span>
            <span className="totals-value">$ {total == 0 ? 0 : shippingFee}</span>
          </div>
          <div className="cart-page-totals-item">
            <span className="totals-label">Total</span>
            <span className="totals-value">$ {total == 0 ? 0 : total + Number(shippingFee)}</span>
          </div>
          {(cart == null || cart.length == 0) && <span className="checkout-button">Empty cart</span>}
          {cart != null && cart.length != 0 && (
            <Link to="/checkout" className="checkout-button">
              Checkout
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
