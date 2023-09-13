import React, { useEffect, useState } from "react";
import req from "../../utils/req.js";
import "./orders.page.scss";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState(null);
  const [pending, setPending] = useState(true);

  const getOrders = async () => {
    try {
      setLoading(true);
      const res = await req.get("/orders");
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      window.alert("Status: " + error.status + ", Error: " + error.message);
    }
  };

  const finishOrder = async (_id) => {
    try {
      const res = await req.patch("/orders", {
        _id: _id
      });

      setOrders(res.data);
    } catch (error) {
      window.alert("Status: " + error.status + ", Error: " + error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <div className="orders">
        {!loading && (
          <>
            <div className="order-filter">
              <button
                className={pending ? "filter-button selected" : "filter-button"}
                onClick={() => {
                  setPending(true);
                }}
              >
                Pending
              </button>
              <button
                className={pending ? "filter-button" : "filter-button selected"}
                onClick={() => {
                  setPending(false);
                }}
              >
                Finished
              </button>
            </div>

            <div className="orders-container">
              {orders.map((order) => {
                if ((!order.done && pending) || (order.done && !pending))
                  return (
                    <div key={order._id} className="order">
                      ID: {order._id}
                      <div className="order-items">
                        <label>Items ({order.items.length})</label>
                        {order.items.map((item) => {
                          return (
                            <div className="order-item" key={order._id + item._id}>
                              <img src={item.img[0]} alt="" className="order-item-img" />
                              <div className="order-item-info">
                                <span className="order-item-name">{item.name}</span>
                                <span className="order-item-price">$ {item.price}</span>{" "}
                                {item.variants.map((v) => {
                                  return (
                                    <>
                                      <span key={order._id + v._id}>
                                        {v.size} x {v.quantity}
                                      </span>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="order-client">
                        <div className="order-client-info">
                          <label>Contact</label>
                          <span>First name: {order.client.contact.firstname}</span>
                          <span>Last name: {order.client.contact.lastname}</span>
                          <span>Email: {order.client.contact.email}</span>
                          <span>Phone number: {order.client.contact.phonenumber}</span>
                        </div>
                        <div className="order-client-info">
                          <label>Shipping address</label>
                          <span>Country: {order.client.shippingAddress.country}</span>
                          <span>First name: {order.client.shippingAddress.firstname}</span>
                          <span>Last name: {order.client.shippingAddress.lastname}</span>
                          <span>Address: {order.client.shippingAddress.address}</span>
                          <span>City: {order.client.shippingAddress.city}</span>
                          <span>Phone number: {order.client.shippingAddress.phonenumber}</span>
                        </div>
                        <div className="order-client-info">
                          <label>Billing address</label>
                          <span>Country: {order.client.billingAddress.country}</span>
                          <span>First name: {order.client.billingAddress.firstname}</span>
                          <span>Last name: {order.client.billingAddress.lastname}</span>
                          <span>Address: {order.client.billingAddress.address}</span>
                          <span>City: {order.client.billingAddress.city}</span>
                          <span>Phone number: {order.client.billingAddress.phonenumber}</span>
                        </div>
                      </div>
                      {!order.done && (
                        <button
                          className="done-button"
                          onClick={() => {
                            finishOrder(order._id);
                          }}
                        >
                          Finish order
                        </button>
                      )}{" "}
                      <hr />
                    </div>
                  );
                else return <></>;
              })}
            </div>
          </>
        )}
        {loading && <>Loading...</>}
      </div>
    </>
  );
};

export default Orders;
