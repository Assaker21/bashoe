import React, { useEffect, useState } from "react";
import req from "../../utils/req.js";
import { Link, useNavigate } from "react-router-dom";
import "./checkout.page.scss";

const Checkout = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [contact, setContact] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: ""
  });
  const [shippingAddress, setShippingAddress] = useState({
    country: "",
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    phonenumber: ""
  });
  const [billingAddress, setBillingAddress] = useState({
    country: "",
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    phonenumber: ""
  });
  const [sameAddress, setSameAddress] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const shippingFee = Number(localStorage.getItem("shippingFee"));

  useEffect(() => {
    if (cart) {
      if (localStorage.getItem("cart") != JSON.stringify(cart)) {
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("storage"));
      }
    } else {
      if (localStorage.getItem != null) {
        localStorage.setItem("cart", null);
        window.dispatchEvent(new Event("storage"));
      }
    }
    return () => {
      localStorage.setItem("cart", JSON.stringify(cart));
    };
  }, [cart]);

  const getTotal = () => {
    var tot = 0;
    for (var i = 0; i < cart.length; i++) {
      tot += cart[i].price * cart[i].quantity;
    }

    return tot;
  };

  const navigate = useNavigate();

  const checkout = async () => {
    try {
      setLoading(true);
      const res = await req.post("/orders", {
        cart: cart,
        client: {
          contact: contact,
          shippingAddress: shippingAddress,
          billingAddress: sameAddress ? shippingAddress : billingAddress
        },
        done: false
      });

      setLoading(false);

      if (res.status == "201") {
        localStorage.setItem("cart", null);
        window.dispatchEvent(new Event("storage"));
        setCart(null);
        navigate("/finish");
      }
    } catch (error) {
      setError(error + "   Something went wrong! Try again later!" + Math.random());
    }
  };

  return (
    <>
      <form
        className="checkout"
        onSubmit={(e) => {
          e.preventDefault();
          if (cart && !loading) checkout();
        }}
      >
        <div className="checkout-title">Checkout</div>

        <div className="checkout-info">
          <div className="checkout-info-title">Contact</div>
          <div className="checkout-info-body">
            <div className="checkout-info-forms">
              <div className="checkout-info-form">
                <label htmlFor="" className="checkout-info-label">
                  First name
                </label>
                <input
                  type="text"
                  className="checkout-info-input"
                  required
                  onChange={(e) => {
                    setContact((c) => {
                      c.firstname = e.target.value;
                      return c;
                    });
                  }}
                />
              </div>
              <div className="checkout-info-form">
                <label htmlFor="" className="checkout-info-label">
                  Last name
                </label>
                <input
                  type="text"
                  required
                  className="checkout-info-input"
                  onChange={(e) => {
                    setContact((c) => {
                      c.lastname = e.target.value;
                      return c;
                    });
                  }}
                />
              </div>
            </div>
            <div className="checkout-info-form">
              <label htmlFor="" className="checkout-info-label">
                Email
              </label>
              <input
                type="email"
                required
                className="checkout-info-input"
                onChange={(e) => {
                  setContact((c) => {
                    c.email = e.target.value;
                    return c;
                  });
                }}
              />
            </div>
            <div className="checkout-info-form">
              <label htmlFor="phonenumbercontact" className="checkout-info-label">
                Phone number
              </label>
              <input
                id="phonenumbercontact"
                required
                type="text"
                className="checkout-info-input"
                onChange={(e) => {
                  setContact((c) => {
                    c.phonenumber = e.target.value;
                    return c;
                  });
                }}
              />
            </div>
          </div>
        </div>

        <div className="checkout-info">
          <div className="checkout-info-title">Shipping address</div>
          <div className="checkout-info-body">
            <div className="checkout-info-form">
              <label htmlFor="" className="checkout-info-label">
                Country/Region
              </label>
              <input
                type="text"
                readOnly
                value="Lebanon"
                required
                className="checkout-info-input"
                onChange={(e) => {
                  setShippingAddress((s) => {
                    s.country = e.target.value;
                    return s;
                  });
                }}
              />
            </div>
            <div className="checkout-info-forms">
              <div className="checkout-info-form">
                <label htmlFor="" className="checkout-info-label">
                  First name
                </label>
                <input
                  type="text"
                  required
                  className="checkout-info-input"
                  onChange={(e) => {
                    setShippingAddress((s) => {
                      s.firstname = e.target.value;
                      return s;
                    });
                  }}
                />
              </div>
              <div className="checkout-info-form">
                <label htmlFor="" className="checkout-info-label">
                  Last name
                </label>
                <input
                  type="text"
                  required
                  className="checkout-info-input"
                  onChange={(e) => {
                    setShippingAddress((s) => {
                      s.lastname = e.target.value;
                      return s;
                    });
                  }}
                />
              </div>
            </div>
            <div className="checkout-info-form">
              <label htmlFor="" className="checkout-info-label">
                Address
              </label>
              <input
                type="text"
                required
                className="checkout-info-input"
                onChange={(e) => {
                  setShippingAddress((s) => {
                    s.address = e.target.value;
                    return s;
                  });
                }}
              />
            </div>
            <div className="checkout-info-form">
              <label htmlFor="" className="checkout-info-label">
                City
              </label>
              <input
                type="text"
                required
                className="checkout-info-input"
                onChange={(e) => {
                  setShippingAddress((s) => {
                    s.city = e.target.value;
                    return s;
                  });
                }}
              />
            </div>
            <div className="checkout-info-form">
              <label htmlFor="" className="checkout-info-label">
                Phone number
              </label>
              <input
                type="text"
                required
                className="checkout-info-input"
                onChange={(e) => {
                  setShippingAddress((s) => {
                    s.phonenumber = e.target.value;
                    return s;
                  });
                }}
              />
            </div>
          </div>
        </div>

        <div className="checkout-info">
          <div className="checkout-info-title">Payment</div>
          <div className="checkout-info-body">
            <span className="checkout-cash-on-delivery">
              <i className="bx bx-check"></i>Cash on Delivery
            </span>
          </div>
        </div>

        {!sameAddress && (
          <div className="checkout-info">
            <div className="checkout-info-title">Billing address</div>
            <div className="checkout-info-body">
              <div className="checkout-info-form checkbox">
                <label htmlFor="sameasshippingaddresscheck" className="checkout-info-label">
                  Same as shipping address
                </label>
                <input
                  id="sameasshippingaddresscheck"
                  defaultChecked={sameAddress}
                  type="checkbox"
                  className="checkout-info-input"
                  onChange={(e) => {
                    setSameAddress(e.target.checked);
                  }}
                />
              </div>
              <div className="checkout-info-form">
                <label htmlFor="" className="checkout-info-label">
                  Country/Region
                </label>
                <input
                  type="text"
                  readOnly
                  value="Lebanon"
                  required
                  className="checkout-info-input"
                  onChange={(e) => {
                    setBillingAddress((b) => {
                      b.country = e.target.value;
                      return b;
                    });
                  }}
                />
              </div>
              <div className="checkout-info-forms">
                <div className="checkout-info-form">
                  <label htmlFor="" className="checkout-info-label">
                    First name
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue={billingAddress.firstname}
                    className="checkout-info-input"
                    onChange={(e) => {
                      setBillingAddress((b) => {
                        b.firstname = e.target.value;
                        return b;
                      });
                    }}
                  />
                </div>
                <div className="checkout-info-form">
                  <label htmlFor="" className="checkout-info-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue={billingAddress.lastname}
                    className="checkout-info-input"
                    onChange={(e) => {
                      setBillingAddress((b) => {
                        b.lastname = e.target.value;
                        return b;
                      });
                    }}
                  />
                </div>
              </div>
              <div className="checkout-info-form">
                <label htmlFor="" className="checkout-info-label">
                  Address
                </label>
                <input
                  type="text"
                  required
                  defaultValue={billingAddress.address}
                  className="checkout-info-input"
                  onChange={(e) => {
                    setBillingAddress((b) => {
                      b.address = e.target.value;
                      return b;
                    });
                  }}
                />
              </div>
              <div className="checkout-info-form">
                <label htmlFor="" className="checkout-info-label">
                  City
                </label>
                <input
                  type="text"
                  required
                  defaultValue={billingAddress.city}
                  className="checkout-info-input"
                  onChange={(e) => {
                    setBillingAddress((b) => {
                      b.city = e.target.value;
                      return b;
                    });
                  }}
                />
              </div>
              <div className="checkout-info-form">
                <label htmlFor="" className="checkout-info-label">
                  Phone number
                </label>
                <input
                  type="text"
                  required
                  defaultValue={billingAddress.phonenumber}
                  className="checkout-info-input"
                  onChange={(e) => {
                    setBillingAddress((b) => {
                      b.phonenumber = e.target.value;
                      return b;
                    });
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {sameAddress && (
          <div className="checkout-info">
            <div className="checkout-info-title">Billing address</div>
            <div className="checkout-info-body">
              <div className="checkout-info-form checkbox">
                <label htmlFor="sameasshippingaddresscheck" className="checkout-info-label">
                  Same as shipping address
                </label>
                <input
                  id="sameasshippingaddresscheck"
                  defaultChecked={sameAddress}
                  type="checkbox"
                  className="checkout-info-input"
                  onChange={(e) => {
                    setSameAddress(e.target.checked);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {(cart == null || cart.length == 0) && (
          <button
            className="checkout-place-order"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Empty cart
          </button>
        )}

        {loading && cart != null && cart.length != 0 && <button className="checkout-place-order">Loading</button>}

        {!loading && cart != null && cart.length != 0 && (
          <button className="checkout-place-order">
            Place order - {cart.length} items - $ {getTotal() + shippingFee} total
          </button>
        )}
        {error != null && error != "" && (
          <>
            <div className="error">{error}</div>
          </>
        )}
      </form>
    </>
  );
};

export default Checkout;
