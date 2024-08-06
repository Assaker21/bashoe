import { Route, Routes } from "react-router-dom";
import AllOrders from "./pages/all-orders.page";

export default function Orders() {
  return (
    <Routes>
      <Route path="/" element={<AllOrders />} />
      <Route path="/:id" element={<AllOrders />} />
    </Routes>
  );
}
