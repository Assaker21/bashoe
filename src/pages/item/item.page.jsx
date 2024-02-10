import React, { useEffect, useState } from "react";
import req from "../../utils/req.js";
import "./item.page.scss";
import { useNavigate } from "react-router-dom";
import AlertModal from "../../components/alert-modal/alert-modal.component.jsx";

const Item = () => {
  const [item, setItem] = useState(null);
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [alertOpen, setAlertOpen] = useState(false);

  const navigate = useNavigate();

  const getItem = async () => {
    setLoading(true);
    const res = await req.get(
      "/items?id=" + new URLSearchParams(window.location.search).get("id")
    );
    setItem(res.data);
    setImg(res.data.img[0]);
    setSize(res.data.sizes[0]);
    setQuantity(1);
    setLoading(false);

    console.log(res.data);
  };

  useEffect(() => {
    localStorage.setItem("size", size);
  }, [size]);

  useEffect(() => {
    localStorage.setItem("quantity", quantity);
  }, [quantity]);

  useEffect(() => {
    getItem();
  }, []);

  const saveItem = async () => {
    try {
      setLoading(true);
      const res = await req.patch("/items", {
        ...item,
      });

      if (res.status == 201) {
        location.reload();
        // navigate("/item?id=" + item._id);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      window.alert("Status: " + error.status + ", Error: " + error.message);
    }
  };

  const deleteItem = async () => {
    try {
      setLoading(true);
      const res = await req.delete("/items/" + item._id, {
        ...item,
      });

      if (res.status == 201) {
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      window.alert("Status: " + error.status + ", Error: " + error.message);
    }
  };

  return (
    <>
      {!loading && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveItem();
          }}
          className="edit-item"
        >
          <div className="delete-container">
            <div className="label-input">
              <label>ID: {item._id}</label>
            </div>
            <button
              onClick={() => {
                setAlertOpen(Math.random());
              }}
              type="button"
              className="delete-button"
            >
              Delete
            </button>
          </div>

          <div className="label-input">
            <label>Title</label>
            <input
              type="text"
              defaultValue={item.name}
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
              defaultValue={item.price}
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
              defaultValue={item.desc}
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
            {/*<label>Category</label>
            <input
              type="text"
              defaultValue={item.cat}
              onChange={(e) => {
                setItem((item) => {
                  var newItem = { ...item };
                  newItem.cat = e.target.value;
                  return newItem;
                });
              }}
            />*/}
            <label htmlFor="cats">Category</label>
            <select
              id="cats"
              name="cats"
              defaultValue={item.cat}
              onChange={(e) => {
                setItem((item) => {
                  var newItem = { ...item };
                  newItem.cat = e.target.value;
                  return newItem;
                });
              }}
            >
              {JSON.parse(localStorage.getItem("cats")).map((cat, index) => {
                return (
                  <option key={`${cat} ${index}`} value={cat}>
                    {cat}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="label-input">
            <label>Images</label>
            <textarea
              rows={item.img.length + 3}
              onChange={(e) => {
                setItem((item) => {
                  var newItem = { ...item };
                  newItem.img = e.target.value.split("\n");
                  setImg(newItem.img[0]);
                  return newItem;
                });
              }}
              defaultValue={item.img.toString().replaceAll(",", "\n")}
            ></textarea>
          </div>

          <div className="label-input">
            <label>Sizes</label>
            <textarea
              rows={item.sizes.length + 5}
              onChange={(e) => {
                setItem((item) => {
                  var newItem = { ...item };
                  newItem.sizes = e.target.value.split("\n");
                  return newItem;
                });
              }}
              defaultValue={item.sizes.toString().replaceAll(",", "\n")}
            ></textarea>
          </div>

          <button className="save-button">Save item</button>
        </form>
      )}
      <AlertModal openSignal={alertOpen} onYes={deleteItem} />
      <form
        className="single-item-item"
        onSubmit={(e) => {
          e.preventDefault();
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
                    <div
                      key={Math.random()}
                      className={
                        img == _img
                          ? "all-imgs-wrapper selected"
                          : "all-imgs-wrapper"
                      }
                    >
                      <img
                        src={_img}
                        alt=""
                        className={
                          img == _img
                            ? "single-item-img selected"
                            : "single-item-img"
                        }
                        onClick={(e) => setImg(e.target.src)}
                      />
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
                        className={
                          size == s
                            ? "single-item-size selected"
                            : "single-item-size"
                        }
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
