import Basket from "./pages/Basket";
import AdminPage from "./pages/AdminPage";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import ProductPage from "./pages/ProductPage";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  LOGIN_ROUTE,
  PRODUCT_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: PRODUCT_ROUTE + "/:id",
    Component: ProductPage,
  },
];
