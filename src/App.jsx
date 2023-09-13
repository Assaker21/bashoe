import React, { useEffect, useState } from "react";
import req from "./utils/req.js";
import Home from "./pages/home/home.page.jsx";
import Item from "./pages/item/item.page.jsx";
import Checkout from "./pages/checkout/checkout.page.jsx";
import Cart from "./pages/cart/cart.page.jsx";
import Finish from "./pages/finish/finish.page.jsx";
import Navbar from "./components/navbar/navbar.component.jsx";
import Footer from "./components/footer/footer.component.jsx";

import { createBrowserRouter, Outlet, RouterProvider, useNavigate } from "react-router-dom";

function App() {
  const [query, setQuery] = useState(new URLSearchParams(window.location.search));

  const init = async () => {
    try {
      const res = (await req.get("/init")).data;
      localStorage.setItem("cats", JSON.stringify(res.cats));
      localStorage.setItem("shippingFee", res.shippingFee);
      window.dispatchEvent(new Event("cats&shipping"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const Layout = () => {
    return (
      <>
        <div className="app">
          <Navbar query={query} setQuery={setQuery} />
          <Outlet />
          <Footer />
        </div>
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home query={query} setQuery={setQuery} />
        },
        {
          path: "/cart",
          element: <Cart />
        },
        {
          path: "/item",
          element: <Item />
        },
        {
          path: "/checkout",
          element: <Checkout />
        },
        {
          path: "/finish",
          element: <Finish />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
