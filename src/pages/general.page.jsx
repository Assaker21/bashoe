import Navbar from "../components/navbar/navbar.component";
import Footer from "../components/footer/footer.component";
import Home from "./home/home.page";
import "./general.page.scss";

import { Outlet } from "react-router-dom";

export default function General() {
  return (
    <>
      <Navbar />
      <div className="main-outlet">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
