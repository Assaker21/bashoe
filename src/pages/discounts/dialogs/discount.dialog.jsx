import "./order.dialog.scss";
import FormDialog from "../../../components/dialogs/form-dialog.component";
import DropDown from "../../../components/dropdown/dropdown.component";
import { useEffect, useState } from "react";
import ordersApi from "../../../api/orders.api";

export default function OrderDialog({ order, setOrders, ...rest }) {
  const [localOrder, setLocalOrder] = useState();
  const [updatedOrder, setUpdatedOrder] = useState();
  const [loading, setLoading] = useState({ save: false });

  useEffect(() => {
    setLocalOrder(order);
    setUpdatedOrder({});
  }, [order]);

  const onSave = async () => {
    setLoading({ ...loading, save: true });

    const { ok, data } = await ordersApi.updateSingle(
      { id: order.id },
      updatedOrder
    );

    if (ok) {
      setOrders(data);
      setUpdatedOrder({});
    }

    setLoading({ ...loading, save: false });
  };

  return (
    <FormDialog
      {...rest}
      header={`Order #${order?.id}`}
      saveEnabled={JSON.stringify(updatedOrder)?.trim() != "{}"}
      onSave={onSave}
      saveLoading={Boolean(loading?.save)}
    >
      <DropDown
        values={[
          { id: 3, description: "Finished" },
          { id: 1, description: "Pending" },
          { id: 2, description: "Cancelled" },
        ]}
        value={{
          id: localOrder?.orderStatus?.id,
          description: localOrder?.orderStatus?.description,
        }}
        setValue={(newValue) => {
          setLocalOrder((curr) => {
            return { ...curr, orderStatus: newValue };
          });

          setUpdatedOrder((curr) => {
            return { ...curr, orderStatusId: newValue.id };
          });
        }}
        optionLabel={"description"}
        placeholder={"Status"}
      />
    </FormDialog>
  );
}
