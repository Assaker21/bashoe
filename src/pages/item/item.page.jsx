import React, { useEffect, useState } from "react";
import req from "../../utils/req.js";
import "./item.page.scss";

const Item = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [item, setItem] = useState(JSON.parse(localStorage.getItem("item")));
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const getItem = async () => {
    setLoading(true);
    const res = await req.get("/items?id=" + new URLSearchParams(window.location.search).get("id"));
    setItem(res.data);
    localStorage.setItem("item", JSON.stringify(res.data));
    setImg(res.data.img[0]);
    setSize(res.data.sizes[0]);
    setQuantity(1);
    setLoading(false);
  };

  useEffect(() => {
    if (cart) {
      if (localStorage.getItem("cart") != JSON.stringify(cart)) {
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("storage"));
      }
    } else {
      if (cart != null || localStorage.getItem != null) {
        localStorage.setItem("cart", null);
        window.dispatchEvent(new Event("storage"));
      }
    }
    return () => {
      localStorage.setItem("cart", JSON.stringify(cart));
    };
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("size", size);
  }, [size]);

  useEffect(() => {
    localStorage.setItem("quantity", quantity);
  }, [quantity]);

  useEffect(() => {
    getItem();
  }, []);

  const addToCart = async () => {
    if (!cart) {
      setCart([
        {
          ...item,
          size: size,
          quantity: quantity
        }
      ]);
    } else {
      const newCart = [...cart];
      var found = false;
      for (var i = 0; i < newCart.length; i++) {
        if ((item._id + size).toString().replace(" ", "") === (newCart[i]._id + newCart[i].size).toString().replace(" ", "")) {
          newCart[i].quantity += quantity;
          setCart(newCart);
          found = true;
          break;
        }
      }

      if (!found) {
        newCart.push({
          ...item,
          size: size,
          quantity: quantity
        });
        setCart(newCart);
      }
    }
  };

  return (
    <>
      <form
        className="single-item-item"
        onSubmit={(e) => {
          e.preventDefault();
          addToCart();
        }}
      >
        {!loading && (
          <>
            <div className="single-item-images">
              <div className="img-wrapper">
                <img src={img} alt="" className="single-item-main-img" />
              </div>
              <div className="single-item-all-imgs">
                {item.img.map((_img) => {
                  return (
                    <div key={Math.random()} className={img == _img ? "all-imgs-wrapper selected" : "all-imgs-wrapper"}>
                      <img src={_img} alt="" className={img == _img ? "single-item-img selected" : "single-item-img"} onClick={(e) => setImg(e.target.src)} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="single-item-info">
              <span className="single-item-title">{item.name}</span>
              <span className="single-item-price">$ {item.price}</span>
              <span className="single-item-desc">{item.desc}</span>
              <div className="single-item-size-container">
                <label>Size</label>
                <div className="single-item-sizes">
                  {item.sizes.map((s) => {
                    return (
                      <span
                        key={s}
                        className={size == s ? "single-item-size selected" : "single-item-size"}
                        onClick={() => {
                          setSize(s);
                        }}
                      >
                        {s}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="single-item-quantity-container">
                <label>Quantity</label>
                <input
                  type="number"
                  defaultValue="1"
                  min="1"
                  className="quantity-input"
                  onChange={(e) => {
                    e.preventDefault();
                    setQuantity(Number(e.target.value));
                  }}
                />
              </div>
              <button className="single-item-add-to-cart">Add to cart</button>
            </div>
          </>
        )}
        {loading && <>Loading...</>}
      </form>
    </>
  );
};

export default Item;
