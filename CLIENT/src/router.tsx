import { createBrowserRouter } from "react-router-dom";
import Layout from './layouts/Layout';
import Products, { loader as productsLoader } from "./pages/Products";
import Newproduct, {action as newProductAction} from "./pages/Newproduct";
import EditProduct, {loader as editProductLoader, action as editProductAction} from "./pages/EditProduct";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index:true,
                element: <Products/>,
                loader: productsLoader
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
            }
        ]
    }
])