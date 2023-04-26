import { createBrowserRouter, Link } from "react-router-dom";
import Auth from "../modules/auth/context/AuthProvider";
import Login from "../modules/auth/pages/Login";
import RootLayout from "../modules/common/layouts/RootLayout";
import Dashboard from "../modules/dashboard/pages/Dashboard";
import ProductAdd from "../modules/product/components/ProductAdd";
import ProductDetail from "../modules/product/pages/ProductDetail";
import ProductListing from "../modules/product/pages/ProductListing";
import UserListing from "../modules/user/pages/UserListing";

const router = createBrowserRouter([
  {
    element: <Auth />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            index: true, // path: ""
            element: <Dashboard />,
          },
          {
            path: "products",
            element: <ProductListing />,
          },
          {
            path: "products/:productId",
            element: <ProductDetail />,
          },
          {
            path: "products/new",
            element: <ProductAdd />,
          },
          {
            path: "users",
            element: <UserListing />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
