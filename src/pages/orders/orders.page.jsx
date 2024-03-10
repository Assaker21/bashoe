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
import { useState } from "react";

import "./orders.page.scss";

export default function Orders() {
  const [tab, setTab] = useState(0);
  const [orders, setOrders] = useState({
    finished: [
      {
        id: 1,
        address: {
          city: "Jbeil",
          country: {
            name: "Lebanon",
            code: "961",
            flag: "",
          },
          address: "1227 street Cosobo",
        },
        user: {
          firstName: "Charbel",
          lastName: "Assaker",
          email: "ca@admin.com",
          phoneNumber: "03344223",
        },
        orderItems: [
          {
            item: {
              id: 1,
              name: "Jordan",
              description: "",
              price: 23,
              sku: "",
              images: [
                "https://images.stockx.com/360/Nike-Kobe-11-EM-Low-Barcelona/Images/Nike-Kobe-11-EM-Low-Barcelona/Lv2/img<number>.jpg?fm=avif&auto=compress&w=480&dpr=2&updated_at=1635175004&h=320&q=60",
              ],
            },
            quantity: 1,
            itemVariant: {
              id: 1,
              description: "45",
            },
          },
          {
            item: {
              id: 1,
              name: "Jordan",
              description: "",
              price: 23,
              sku: "",
              images: [
                "https://images.stockx.com/360/Nike-Kobe-11-EM-Low-Barcelona/Images/Nike-Kobe-11-EM-Low-Barcelona/Lv2/img<number>.jpg?fm=avif&auto=compress&w=480&dpr=2&updated_at=1635175004&h=320&q=60",
              ],
            },
            quantity: 1,
            itemVariant: {
              id: 1,
              description: "45",
            },
          },
          {
            item: {
              id: 1,
              name: "Jordan",
              description: "",
              price: 23,
              sku: "jordan-black",
              images: [
                "https://images.stockx.com/360/Nike-Kobe-11-EM-Low-Barcelona/Images/Nike-Kobe-11-EM-Low-Barcelona/Lv2/img<number>.jpg?fm=avif&auto=compress&w=480&dpr=2&updated_at=1635175004&h=320&q=60",
              ],
            },
            quantity: 1,
            itemVariant: {
              id: 1,
              description: "45",
            },
          },
        ],
      },
      {
        id: 2,
        address: {
          city: "Jbeil",
          country: {
            name: "Lebanon",
            code: "961",
            flag: "",
          },
          address: "1227 street Cosobo",
        },
        user: {
          firstName: "Charbel",
          lastName: "Assaker",
          email: "ca@admin.com",
          phoneNumber: "03344223",
        },
        orderItems: [
          {
            item: {
              id: 1,
              name: "Jordan",
              description: "",
              price: 23,
              sku: "",
              images: [
                "https://images.stockx.com/360/Nike-Kobe-11-EM-Low-Barcelona/Images/Nike-Kobe-11-EM-Low-Barcelona/Lv2/img<number>.jpg?fm=avif&auto=compress&w=480&dpr=2&updated_at=1635175004&h=320&q=60",
              ],
            },
            quantity: 1,
            itemVariant: {
              id: 1,
              description: "45",
            },
          },
        ],
      },
    ],
    cancelled: [
      {
        id: 3,
        address: {
          city: "Jbeil",
          country: {
            name: "Lebanon",
            code: "961",
            flag: "",
          },
          address: "1227 street Cosobo",
        },
        user: {
          firstName: "Charbel",
          lastName: "Assaker",
          email: "ca@admin.com",
          phoneNumber: "03344223",
        },
        orderItems: [
          {
            item: {
              id: 1,
              name: "Jordan",
              description: "",
              price: 23,
              sku: "",
              images: [
                "https://images.stockx.com/360/Nike-Kobe-11-EM-Low-Barcelona/Images/Nike-Kobe-11-EM-Low-Barcelona/Lv2/img<number>.jpg?fm=avif&auto=compress&w=480&dpr=2&updated_at=1635175004&h=320&q=60",
              ],
            },
            quantity: 1,
            itemVariant: {
              id: 1,
              description: "45",
            },
          },
        ],
      },
    ],
    unfinished: [
      {
        id: 4,
        address: {
          city: "Jbeil",
          country: {
            name: "Lebanon",
            code: "961",
            flag: "",
          },
          address: "1227 street Cosobo",
        },
        user: {
          firstName: "Charbel",
          lastName: "Assaker",
          email: "ca@admin.com",
          phoneNumber: "03344223",
        },
        orderItems: [
          {
            item: {
              id: 1,
              name: "Jordan",
              description: "",
              price: 23,
              sku: "",
              images: [
                "https://images.stockx.com/360/Nike-Kobe-11-EM-Low-Barcelona/Images/Nike-Kobe-11-EM-Low-Barcelona/Lv2/img<number>.jpg?fm=avif&auto=compress&w=480&dpr=2&updated_at=1635175004&h=320&q=60",
              ],
            },
            quantity: 1,
            itemVariant: {
              id: 1,
              description: "45",
            },
          },
        ],
      },
      {
        id: 5,
        address: {
          city: "Jbeil",
          country: {
            name: "Lebanon",
            code: "961",
            flag: "",
          },
          address: "1227 street Cosobo",
        },
        user: {
          firstName: "Charbel",
          lastName: "Assaker",
          email: "ca@admin.com",
          phoneNumber: "03344223",
        },
        orderItems: [
          {
            item: {
              id: 1,
              name: "Jordan",
              description: "",
              price: 23,
              sku: "",
              images: [
                "https://images.stockx.com/360/Nike-Kobe-11-EM-Low-Barcelona/Images/Nike-Kobe-11-EM-Low-Barcelona/Lv2/img<number>.jpg?fm=avif&auto=compress&w=480&dpr=2&updated_at=1635175004&h=320&q=60",
              ],
            },
            quantity: 1,
            itemVariant: {
              id: 1,
              description: "45",
            },
          },
        ],
      },
    ],
  });

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
        {orders[
          tab === 0 ? "unfinished" : tab === 1 ? "finished" : "cancelled"
        ].map((order) => (
          <Order key={"Order: " + order.id} order={order} />
        ))}
      </div>
    </section>
  );
}

function Order({ order }) {
  return (
    <div className="order-container">
      <h4 className="order-title">Address</h4>
      <p>
        {order.address.country.name}, {order.address.city},{" "}
        {order.address.address}
      </p>

      <br />

      <h4 className="order-title">Items</h4>

      {order.orderItems.map((orderItem) => (
        <div
          key={"OrderItem: " + orderItem.id}
          className="order-item-container"
        >
          <img
            className="order-item-image"
            src={orderItem.item.images[0].replace("<number>", "01")}
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

      <h4 className="order-title">Total + shipping: $99.99</h4>
      <button>Mark as finished</button>
      <button>Mark as unfinished</button>
      <button>Mark as cancelled</button>
    </div>
  );
}
