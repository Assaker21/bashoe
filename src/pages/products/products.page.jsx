import { Route, Routes } from "react-router-dom";
import AllProducts from "./pages/all-products.page";
import Product from "./pages/product.page";

export default function Products() {
  return (
    <Routes>
      <Route path="/" element={<AllProducts />} />
      <Route path="/:sku" element={<Product />} />
    </Routes>
  );
}
