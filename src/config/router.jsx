import { createBrowserRouter, Link } from "react-router-dom";
import RootLayout from "../modules/common/layouts/RootLayout";
import Dashboard from "../modules/dashboard/pages/Dashboard";
import ProductAdd from "../modules/product/components/ProductAdd";
import ProductEdit from "../modules/product/components/ProductEdit";
import ProductDetail from "../modules/product/pages/ProductDetail";



import ProductListing from "../modules/product/pages/ProductListing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{
      index: true, // path: ""
      element: <Dashboard />
    },
    {
      path: "products",
      element: <ProductListing />
    },
    {
      path: "products/:productId",
      element: <ProductDetail />
    },
    {
      path: "products/new",
      element: <ProductAdd />
    },
    {
      path: "products/edit",
      element: <ProductEdit />
    },
  ],
  },
]);

export default router;
