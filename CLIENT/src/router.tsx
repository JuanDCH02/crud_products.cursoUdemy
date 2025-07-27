import { createBrowserRouter } from "react-router-dom";
import Layout from './layouts/Layout';
import Products, { loader as productsLoader } from "./pages/Products";
import Newproduct, {action as newProductAction} from "./pages/Newproduct";

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
        ]
    }
])