import { createBrowserRouter } from "react-router-dom";
import HomePage from "../frontend/homepage";
import Layout from "./Layout";
import About from "../frontend/about";
import Login from "../frontend/login/Login";
import Dashboard from "../frontend/dashboard";
import ProtectedRoutes from "../utils/ProtectedRoute";
import Logout from "./Logout";
import DashboardLayout from "../frontend/dashboard/DashboardLayout";
import Categories from "../frontend/dashboard/categories";
import AddCategory from "../frontend/dashboard/categories/AddCategory";
import EditCategory from "../frontend/dashboard/categories/EditCategory";
import Products from "../frontend/dashboard/products";
import AddProduct from "../frontend/dashboard/products/AddProduct";
import EditProduct from "../frontend/dashboard/products/EditProduct";
import Shop from "../frontend/shop/Shop";
import ProductDetailPage from "../frontend/product/ProductDetailPage";
import CategoryShop from "../frontend/shop/CategoryShop";
import SearchShop from "../frontend/shop/SearchShop";
import Unauthorized from "./Unauthorized";
import LoginComponent from "../frontend/login/LoginComponent";
import Register from "../frontend/login/Register";
import Customers from "../frontend/dashboard/customers";
import Cart from "../frontend/cart/Cart";
import Checkout from "../frontend/checkout/Checkout";
import Customer from "../frontend/homepage/Customer";
import Contact from "../frontend/contact";
import Orders from "../frontend/homepage/Orders";
import Address from "../frontend/homepage/Address";
import Changepassword from "../frontend/homepage/Changepassword";
import UserProfile from "../frontend/homepage/UserProfile"
import CustomerOrderDetails from "../frontend/homepage/CustomerOrderDetails";

import ShowSliders from "../frontend/dashboard/showsliders";
import AddSlider from "../frontend/dashboard/showsliders/AddSlider";
import EditSlider from "../frontend/dashboard/showsliders/EditSlider";

import AdminOrders from "../frontend/dashboard/orders/index";




const frontendRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        index: true,
      },
       {
        path: "/Customer",
        element:(
        <ProtectedRoutes allowedRoles={["USER"]}>
          <Customer />
        </ProtectedRoutes>
        ),
        children:[
          {
           index:true,
           element:<UserProfile/>
          },
          {
           path:"Profile",
           element:<UserProfile/>
          },
          {
           path:"Orders",
           element:<Orders/>
          },
          {
           path:"Address",
           element:<Address/>
          },
          {
           path:"Changepassword",
           element:<Changepassword/>
          },
          {
            path: "Orders/:id",
            element: <CustomerOrderDetails />
          }
        ]
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/category/:slug",
        element: <CategoryShop />,
      },
      {
        path: "/search",
        element: <SearchShop />,
      },
      {
        path: "/products/:slug",
        element: <ProductDetailPage />,
      },
      {
        path: "/login",
        element: <LoginComponent />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/adminlogin",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
    ],
  },
  {
    path: "/cart",
    element: <Layout />,
    children: [
      {
        path: "/cart",
        element: (
          <ProtectedRoutes allowedRoles={["USER"]}>
            <Cart />
          </ProtectedRoutes>
        ),
        index: true,
      },
    ],
  },
  {
    path: "/checkout",
    element: <Layout />,
    children: [
      {
        path: "/checkout",
        element: (
          <ProtectedRoutes allowedRoles={["USER"]}>
            <Checkout />
          </ProtectedRoutes>
        ),
        index: true,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes allowedRoles={["ADMIN"]}>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        index: true,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "add-category",
        element: <AddCategory />,
      },
      {
        path: "edit-category/:id",
        element: <EditCategory />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "edit-product/:id",
        element: <EditProduct />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "ShowSliders",
        element: <ShowSliders />,
      },
      {
        path: "add-slider",
        element: <AddSlider />,
      },
      {
        path:"edit-slider/:id",
        element: <EditSlider/>
      },
      {
        path: "admin-orders",
        element: <AdminOrders />,
      },
    ],
  },
]);

export default frontendRoutes;
