import Navbar from "../components/navbar/navbar.component";
import Footer from "../components/footer/footer.component";
import Home from "./home/home.page";
import "./general.page.scss";
import Helmet from "react-helmet";
import useDarkWhiteMode from "../utils/useDarkWhiteMode";

import { Outlet } from "react-router-dom";

export default function General() {
  const { isDarkMode } = useDarkWhiteMode();

  return (
    <>
      <Helmet>
        <meta property="og:title" content={"TITLE HERE"} />
        <meta property="og:description" content={"DESC HERE"} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hoophousev2.onrender.com" />
        <meta
          property="og:image"
          content={
            "https://mir-s3-cdn-cf.behance.net/projects/404/5b96ce111493611.Y3JvcCwyNDAwLDE4NzcsMCw0NTE.png"
          }
        />
        <link
          rel="icon"
          type="image/x-icon"
          href={
            isDarkMode
              ? "/images/hoophouse-logo-favicon-white.png"
              : "/images/hoophouse-logo-favicon-black.png"
          }
        />
      </Helmet>
      <Navbar />
      <div className="main-outlet">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
