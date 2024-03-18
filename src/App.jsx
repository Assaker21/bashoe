import General from "./pages/general.page";
import ErrorPage from "./pages/error/error.page.jsx";
import { GeneralContextProvider } from "./contexts/context.jsx";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Items from "./pages/items/items.page.jsx";
import Item from "./pages/items/item/item.page.jsx";
import Home from "./pages/home/home.page.jsx";
import Checkout from "./pages/checkout/checkout.page.jsx";
import Finish from "./pages/finish/finish.page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <General />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      { path: "finish", element: <Finish /> },
      {
        path: ":categorySku",
        element: <Items />,
      },
      {
        path: ":categorySku/:itemSku",
        element: <Item />,
      },
    ],
  },
]);

export default function App() {
  return (
    <GeneralContextProvider>
      <RouterProvider router={router} />
    </GeneralContextProvider>
  );
}
