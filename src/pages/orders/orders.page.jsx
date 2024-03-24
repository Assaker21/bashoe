import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component";
import DenseTable from "../../components/table/table.component";

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Add as AddIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import {
  TextField,
  IconButton,
  CircularProgress,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import "./orders.page.scss";

import ordersServices from "../../services/ordersServices";

export default function Orders() {
  const [tab, setTab] = useState(0);
  const [orders, setOrders] = useState(null);

  async function fetch() {
    const [ok, data] = await ordersServices.getOrders();
    if (ok) {
      console.log("Data: ", data);

      setOrders(formatOrders(data));
    }
  }

  function formatOrders(data) {
    const newOrders = { finished: [], cancelled: [], unfinished: [] };
    data.map((item) => {
      if (item.orderStatusId === 3) {
        newOrders.finished.push(item);
      } else if (item.orderStatusId === 2) {
        newOrders.cancelled.push(item);
      } else if (item.orderStatusId === 1) {
        newOrders.unfinished.push(item);
      }
    });
    return newOrders;
  }

  async function handleUpdate(query, payload) {
    const [ok, data] = await ordersServices.updateOrder(query, payload);
    if (ok) {
      setOrders(formatOrders(data));
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <section className="orders">
      <Breadcrumbs
        items={[
          { name: "Home", to: "/" },
          {
            name: "Orders",
            to: "/orders",
          },
        ]}
      />
      <h1>Orders</h1>
      <Tabs
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        aria-label="icon label tabs example"
      >
        <Tab
          sx={{
            fontWeight: "bold",
            fontSize: "16px",
            textTransform: "none",
            flex: 1,
            p: 0,
            m: 0,
            maxWidth: "unset",
          }}
          label="Unfinished orders"
        />
        <Tab
          sx={{
            fontWeight: "bold",
            fontSize: "16px",
            textTransform: "none",
            flex: 1,
            p: 0,
            m: 0,
            maxWidth: "unset",
          }}
          label="Finished orders"
        />
        <Tab
          sx={{
            fontWeight: "bold",
            fontSize: "16px",
            textTransform: "none",
            flex: 1,
            p: 0,
            m: 0,
            maxWidth: "unset",
          }}
          label="Cancelled orders"
        />
      </Tabs>
      <div className="orders-container">
        {orders &&
          orders[
            tab === 0 ? "unfinished" : tab === 1 ? "finished" : "cancelled"
          ].map((order) => (
            <Order
              key={"Order: " + order.id}
              order={order}
              onUpdate={handleUpdate}
            />
          ))}
      </div>
    </section>
  );
}

function Order({ order, onUpdate }) {
  const calculateOrderCost = useCallback(() => {
    let total = 0;
    order.orderItems.map((orderItem) => {
      total += orderItem.quantity * orderItem.item.price;
    });
    return total + 4;
  }, [order]);

  return (
    <div className="order-container">
      <h4 className="order-title">User</h4>
      <p>
        {order.user.firstName} {order.user.lastName}, {order.user.email},{" "}
        {order.user.phoneNumber}
      </p>
      <br />

      <h4 className="order-title">Address</h4>
      <p>
        {order.address.country.name}, {order.address.city},{" "}
        {order.address.address}
      </p>

      <br />

      <h4 className="order-title">Items</h4>

      {order?.orderItems.map((orderItem) => (
        <div
          key={"OrderItem: " + orderItem.id}
          className="order-item-container"
        >
          <img
            className="order-item-image"
            src={orderItem.item.images[0].url.replace("<number>", "01")}
          />
          <div className="order-item-info-container">
            <p className="order-item-info">Name: {orderItem.item.name}</p>
            <p className="order-item-info">Sku: {orderItem.item.sku}</p>
            <p className="order-item-info">Quantity: {orderItem.quantity}</p>
            <p className="order-item-info">
              Variant: {orderItem.itemVariant.description}
            </p>
          </div>
        </div>
      ))}

      <h4 className="order-title">Total + shipping: ${calculateOrderCost()}</h4>
      <div className="order-buttons-container">
        {order.orderStatusId !== 3 && (
          <button
            className="order-button"
            onClick={() => {
              onUpdate({ id: order.id }, { orderStatusId: 3 });
            }}
          >
            Mark as finished
          </button>
        )}
        {order.orderStatusId !== 1 && (
          <button
            className="order-button"
            onClick={() => {
              onUpdate({ id: order.id }, { orderStatusId: 1 });
            }}
          >
            Mark as unfinished
          </button>
        )}
        {order.orderStatusId !== 2 && (
          <button
            className="order-button"
            onClick={() => {
              onUpdate({ id: order.id }, { orderStatusId: 2 });
            }}
          >
            Mark as cancelled
          </button>
        )}
      </div>
    </div>
  );
}
