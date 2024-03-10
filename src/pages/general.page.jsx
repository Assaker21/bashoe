import Navbar from "../components/navbar/navbar.component";
import Footer from "../components/footer/footer.component";
import Home from "./home/home.page";

import { Outlet } from "react-router-dom";

export default function General() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
