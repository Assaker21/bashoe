import { Route, Routes } from "react-router-dom";
import AllContents from "./pages/all-contents.page";

export default function Contents() {
  return (
    <Routes>
      <Route path="/" element={<AllContents />} />
    </Routes>
  );
}
