import Products from "../pages/Products";
import Login from "../pages/Login"
import Basket from "../pages/Basket"
import ProductsByCategory from "../pages/ProductsByCategory";
import SelectedProduct from "../pages/SelectedProduct";
import Favorite from "../pages/Favorite";

export const routes = [
    { path: "/basket", component: Basket},
    { path: "/products", component: Products},
    { path: "/login", component: Login},
    { path: "/favorite", component: Favorite},
    { path: "/category/:category", component: ProductsByCategory},
    { path: "/products/:id", component: SelectedProduct }
]