import Navbar from "../components/navbar/navbar.component";
import Footer from "../components/footer/footer.component";
import Home from "./home/home.page";
import { Toaster } from "react-hot-toast";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGeneralContext } from "../contexts/context";

export default function General() {
  const location = useLocation();
  const { isAuthenticated } = useGeneralContext();
  return (
    <>
      <Toaster />
      {location.pathname.includes("/login") ? (
        <Outlet />
      ) : isAuthenticated ? (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      ) : (
        <Navigate to="login" />
      )}
    </>
  );
}
