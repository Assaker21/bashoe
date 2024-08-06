import Dashboard from "./pages/dashboard/dashboard.page";
import Orders from "./pages/orders/orders.page";
import Products from "./pages/products/products.page";
import Customers from "./pages/customers/customers.page";
import Content from "./pages/content/content.page";
import Discounts from "./pages/discounts/discounts.page";
import Settings from "./pages/settings/settings.page";
import Variants from "./pages/variants/variants.page";
import Categories from "./pages/categories/categories.page";

import {
  LayoutDashboard,
  Package,
  LibraryBig,
  Users,
  Image,
  Shapes,
  Percent,
  Settings as SettingsIcon,
  Network,
} from "lucide-react";

import { Navigate } from "react-router-dom";

const routes = [
  {
    key: "",
    component: <Navigate to="/dashboard" replace />,
    hidden: true,
    path: "",
  },
  {
    key: "dashboard",
    name: "Dashboard",
    component: <Dashboard />,
    icon: <LayoutDashboard className="icon" />,
    path: "dashboard",
  },
  {
    key: "orders",
    name: "Orders",
    component: <Orders />,
    icon: <Package className="icon" />,
    path: "orders/*",
  },
  {
    key: "products",
    name: "Products",
    component: <Products />,
    icon: <LibraryBig className="icon" />,
    path: "products/*",
  },
  {
    key: "variants",
    name: "Variants",
    component: <Variants />,
    icon: <Network className="icon" />,
    path: "variants/*",
  },
  {
    key: "customers",
    name: "Customers",
    component: <Customers />,
    icon: <Users className="icon" />,
    path: "customers",
  },
  {
    key: "content",
    name: "Content",
    component: <Content />,
    icon: <Image className="icon" />,
    path: "content",
  },
  {
    key: "categories",
    name: "Categories",
    component: <Categories />,
    icon: <Shapes className="icon" />,
    path: "categories/*",
  },
  {
    key: "discounts",
    name: "Discounts",
    component: <Discounts />,
    icon: <Percent className="icon" />,
    path: "discounts",
  },
  {
    key: "settings",
    name: "Settings",
    component: <Settings />,
    icon: <SettingsIcon className="icon" />,
    path: "settings",
  },
];

export default routes;
