import React, { useEffect, useState } from "react";
import req from "../../utils/req.js";
import "./create.page.scss";
import { useNavigate } from "react-router-dom";

const Item = () => {
  const [item, setItem] = useState({
    name: "",
    price: 0,
    desc: "",
    cat: "",
    img: [],
    sizes: []
  });
  const [img, setImg] = useState("");

  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("size", size);
  }, [size]);

  useEffect(() => {
    localStorage.setItem("quantity", quantity);
  }, [quantity]);

  const createItem = async () => {
    try {
      const res = await req.post("/items", {
        ...item
      });
      if (res.status == 201) {
        navigate("/item?id=" + res.data._id);
      }
    } catch (error) {
      window.alert("Status: " + error.status + ", Error: " + error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createItem();
        }}
        className="edit-item"
      >
        <div className="label-input">
          <label>Title</label>
          <input
            type="text"
            onChange={(e) => {
              setItem((item) => {
                var newItem = { ...item };
                newItem.name = e.target.value;
                return newItem;
              });
            }}
          />
        </div>

        <div className="label-input">
          <label>Price</label>
          <input
            type="number"
            defaultValue={0}
            onChange={(e) => {
              setItem((item) => {
                var newItem = { ...item };
                newItem.price = Number(e.target.value);
                return newItem;
              });
            }}
          />
        </div>

        <div className="label-input">
          <label>Description</label>
          <textarea
            rows="10"
            onChange={(e) => {
              setItem((item) => {
                var newItem = { ...item };
                newItem.desc = e.target.value;
                return newItem;
              });
            }}
          ></textarea>
        </div>

        <div className="label-input">
          <label>Category</label>
          <input
            type="text"
            onChange={(e) => {
              setItem((item) => {
                var newItem = { ...item };
                newItem.cat = e.target.value;
                return newItem;
              });
            }}
          />
        </div>

        <div className="label-input">
          <label>Images</label>
          <textarea
            rows={6}
            onChange={(e) => {
              setItem((item) => {
                var newItem = { ...item };
                newItem.img = e.target.value.split("\n");
                setImg(newItem.img[0]);
                return newItem;
              });
            }}
          ></textarea>
        </div>

        <div className="label-input">
          <label>Sizes</label>
          <textarea
            rows={10}
            onChange={(e) => {
              setItem((item) => {
                var newItem = { ...item };
                newItem.sizes = e.target.value.split("\n");
                return newItem;
              });
            }}
          ></textarea>
        </div>

        <button className="save-button">Create item</button>
      </form>

      <form
        className="single-item-item"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
      </form>
    </>
  );
};

export default Item;
