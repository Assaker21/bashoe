import { Route, Routes } from "react-router-dom";
import AllCategories from "./pages/all-categories.page";

export default function Categories() {
  return (
    <Routes>
      <Route path="/" element={<AllCategories />} />
      <Route path="/:id0" element={<AllCategories />} />
      <Route path="/:id1/:id0" element={<AllCategories />} />
      <Route path="/:id2/:id1/:id0" element={<AllCategories />} />
      <Route path="/:id3/:id2/:id1/:id0" element={<AllCategories />} />
      <Route path="/:id4/:id3/:id2/:id1/:id0" element={<AllCategories />} />
      <Route
        path="/:id5/:id4/:id3/:id2/:id1/:id0"
        element={<AllCategories />}
      />
    </Routes>
  );
}
