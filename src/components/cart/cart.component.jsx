import { useGeneralContext } from "../../contexts/context.jsx";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Line from "../../basic-components/line/line.component.jsx";

import "./cart.component.scss";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart } = useGeneralContext();

  const [items, setItems] = useState([
    {
      name: "Jordan 4 Retro Bred Reimagined (GS)",
      images: [
        "https://images.stockx.com/360/Crocs-Classic-Clog-Lightning-McQueen/Images/Crocs-Classic-Clog-Lightning-McQueen/Lv2/img19.jpg?fm=avif&auto=compress&w=576&dpr=1&updated_at=1635308105&h=384&q=57 1x",
      ],
      variant: {
        description: "Size",
        value: "44",
      },
      price: 79,
      quantity: 50,
    },
    {
      name: "Jordan 4 Retro Bred Reimagined (GS)",
      images: [
        "https://images.stockx.com/360/Crocs-Classic-Clog-Lightning-McQueen/Images/Crocs-Classic-Clog-Lightning-McQueen/Lv2/img19.jpg?fm=avif&auto=compress&w=576&dpr=1&updated_at=1635308105&h=384&q=57 1x",
      ],
      variant: {
        description: "Size",
        value: "44",
      },
      price: 79,
      quantity: 50,
    },
  ]);

  const calculateSubtotal = useCallback(() => {
    var subtotal = 0;
    items.map((item) => (subtotal += item.price * item.quantity));
    return subtotal;
  }, [items]);

  const calculateTotal = useCallback(() => {
    return calculateSubtotal() + 4;
  }, [calculateSubtotal]);

  return (
    <section className="cart-menu">
      <span className="cart-menu-title">Your cart ({items.length})</span>
      <div className="cart-menu-items">
        {items?.map((cartItem, index) => (
          <>
            <CartItem items={items} setItems={setItems} index={index} />
            <Line />
          </>
        )) || "Nothing in your cart, yet!"}
      </div>
      <div className="cart-menu-bottom">
        <div className="cart-menu-totals">
          <div className="cart-menu-total">
            <span>Subtotal</span>
            <span>${calculateSubtotal()}</span>
          </div>
          <div className="cart-menu-total">
            <span>Shipping</span>
            <span>$4</span>
          </div>
          <div className="cart-menu-total">
            <span>Total</span>
            <span>${calculateTotal()}</span>
          </div>
        </div>
        <Link to="checkout" className="cart-menu-button">
          Checkout
        </Link>
      </div>
    </section>
  );
}

function CartItem({ items, setItems, index }) {
  return (
    <div className="cart-menu-item">
      <img className="cart-menu-item-image" src={items[index].images[0]} />
      <span className="cart-menu-item-name">{items[index].name}</span>
      <span className="cart-menu-item-variant">
        {items[index].variant.description}: {items[index].variant.value}
      </span>
      <div className="cart-menu-item-price-and-quantity">
        <span className="cart-menu-item-price">${items[index].price}</span>
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
            value={items[index].quantity}
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
          setItems(newItems);
        }}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
}
