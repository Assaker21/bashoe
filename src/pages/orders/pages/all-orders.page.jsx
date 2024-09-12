import { useEffect, useMemo, useState } from "react";
import Datatable from "../../../components/datatable/datatable.component";
import PageHeader from "../../../components/page-header/page-header.component";
import { useNavigate, useParams } from "react-router-dom";
import ordersApi from "../../../api/orders.api";
import "./all-orders.page.scss";
import OrderDialog from "../dialogs/order.dialog";
import useQuery from "../../../hooks/useQuery";

export default function AllOrders() {
  const query = useQuery();
  const params = useParams();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(Boolean(query.get("item")));
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState({ id: Number(query.get("item")) });
  const [loading, setLoading] = useState({});

  async function findManyOrders() {
    setLoading((curr) => ({ ...curr, orders: true }));
    const { ok, data } = await ordersApi.findMany();
    if (ok) {
      setOrders(data);
      console.log("Received data: ", data);
    }

    if (query.get("item")) {
      setSelected(
        data.find((element) => element.id == Number(query.get("item")))
      );
    }

    setLoading((curr) => ({ ...curr, orders: false }));
  }

  useEffect(() => {
    findManyOrders();
  }, []);

  const orderRows = useMemo(() => {
    if (!orders) return null;
    if (orders.length == 0) return [];
    return orders.map((order) => {
      return {
        id: order.id,
        items: JSON.stringify(order.info),
        status: order.orderStatus.description,
        user: JSON.stringify({
          name: order.user.firstName + " " + order.user.lastName,
          email: order.user.email,
          phoneNumber: order.user.phoneNumber,
        }),
        paymentMethod: order.paymentMethod,
        country: order.address.country.name,
        city: order.address.city,
        address: order.address.address,
        price: order.info.reduce((acc, curr) => {
          return acc + Number(curr.item.price);
        }, 0),
        shippingFee: order.shippingFee,
      };
    });
  }, [orders]);

  const updateOrders = (newOrders) => {};

  const order = useMemo(() => {
    if (orders?.length > 0 && !selected?.user) {
      return orders.find((order) => {
        return order.id == selected.id;
      });
    }
    return selected;
  }, [orders, selected]);

  return (
    <section>
      <OrderDialog
        visible={visible}
        setVisible={setVisible}
        loading={loading.orders}
        value={selected}
        order={console.log("Selected: ", selected) || selected}
        setOrders={setOrders}
        onClose={() => {
          navigate("/orders");
        }}
      />
      <PageHeader title="Orders" />
      <Datatable
        buttons={{}}
        loading={loading.orders}
        name="Order"
        data={orderRows}
        setData={updateOrders}
        reorderableRows={false}
        selectable={false}
        onRowClick={(e) => {
          const row = e.data;
          navigate("/orders?item=" + row.id);
          setVisible(true);
          setSelected(orders.find((element) => element.id == row.id));
        }}
        columns={[
          {
            field: "id",
            header: "Id",
            sortable: true,
            style: { width: "100px" },
          },
          {
            field: "user",
            header: "User",
            body: (row) => {
              const user = JSON.parse(row.user);
              return (
                <div className="datatable-user">
                  <span className="datatable-user-name">{user.name}</span>
                  <span className="datatable-user-email">{user.email}</span>
                  <span className="datatable-user-phone-number">
                    {user.phoneNumber}
                  </span>
                </div>
              );
            },
          },
          {
            field: "items",
            header: "Items",
            body: (row) => {
              const items = JSON.parse(row.items);
              return <DatatableItems items={items} />;
            },
          },
          {
            field: "paymentMethod",
            header: "Payment",
            sortable: true,
            style: { width: "100px" },
          },
          {
            field: "country",
            header: "Country",
            sortable: true,
            style: { width: "100px" },
          },
          {
            field: "city",
            header: "City",
            sortable: true,
            style: { width: "100px" },
          },
          {
            field: "address",
            header: "Address",
            sortable: true,
            style: { width: "250px" },
          },
          {
            field: "price",
            header: "Price",
            sortable: true,
            body: (row) => {
              return (
                "$" +
                Number(row.price).toFixed(2) +
                " + shipping $" +
                Number(row.shippingFee).toFixed(2)
              );
            },
          },
          {
            field: "status",
            header: "Status",
            sortable: true,
            body: (row) => {
              return (
                <div
                  className={`chip ${
                    row.status == "Finished"
                      ? "primary"
                      : row.status == "Pending"
                      ? "warning"
                      : "error"
                  }`}
                >
                  {row.status}
                </div>
              );
            },

            style: { width: "120px" },
          },
        ]}
      />
    </section>
  );
}

function DatatableItems({ items }) {
  return (
    <div className="datatable-items">
      {items.map((item) => {
        return (
          <div className="datatable-items-item" key={item?.id}>
            {item?.item?.images[0] && (
              <img
                src={item?.item?.images[0]?.url?.replace("<number>", "01")}
                alt={"Item image: " + item?.item?.id}
              />
            )}

            <div className="datatable-items-item-info">
              <span className="datatable-items-item-name">
                {item?.item?.name}
              </span>
              {item?.variants?.map((variant) => {
                return (
                  <span className="datatable-items-item-variant">
                    {variant?.itemVariantGroup?.description}:{" "}
                    {variant?.description}
                  </span>
                );
              })}
              <span className="datatable-items-item-name">
                Price: ${item?.item?.price}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
