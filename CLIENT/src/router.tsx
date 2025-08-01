import { createBrowserRouter } from "react-router-dom";
import Layout from './layouts/Layout';
import Products, { loader as productsLoader, action as changeAvailabilityAction } from "./pages/Products";
import Newproduct, {action as newProductAction} from "./pages/Newproduct";
import EditProduct, {loader as editProductLoader, action as editProductAction} from "./pages/EditProduct";
import { action as deleteProductAction} from "./components/ProductDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index:true,
                element: <Products/>,
                loader: productsLoader,
                action: changeAvailabilityAction
            },
            {
                path: '/productos/nuevo',
                element: <Newproduct/>,
                action: newProductAction
            },
            {
                path: '/productos/:id/editar', //ROA PATTERN (resource-oriented design)
                element: <EditProduct/>,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: '/productos/:id/eliminar',
                action: deleteProductAction
            }
        ]
    }
])