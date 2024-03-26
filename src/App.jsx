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
import Orders from "./pages/orders/orders.page.jsx";
import Settings from "./pages/settings/settings.page.jsx";
import Images from "./pages/images/images.page.jsx";

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
        path: "new",
        element: <Item />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      { path: "images", element: <Images /> },
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
