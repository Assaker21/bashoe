import Navbar from "../components/navbar/navbar.component";
import Footer from "../components/footer/footer.component";
import Home from "./home/home.page";
import { Toaster } from "react-hot-toast";

import { Outlet } from "react-router-dom";

export default function General() {
  return (
    <>
      <Toaster />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
