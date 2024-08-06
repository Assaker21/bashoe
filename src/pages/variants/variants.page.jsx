import { Route, Routes } from "react-router-dom";
import AllVariants from "./pages/all-variants.page";
import AllVariantGroups from "./pages/all-variant-groups.page";

export default function Variants() {
  return (
    <Routes>
      <Route path="/" element={<AllVariantGroups />} />
      <Route path="/:id" element={<AllVariants />} />
    </Routes>
  );
}
