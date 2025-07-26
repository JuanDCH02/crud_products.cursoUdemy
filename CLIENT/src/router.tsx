import { createBrowserRouter } from "react-router-dom";
import Layout from './layouts/Layout';
import Products from "./pages/Products";
import Newproduct, {action as newProductAction} from "./pages/Newproduct";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index:true,
                element: <Products/>
            },
            {
                path: '/productos/nuevo',
                element: <Newproduct/>,
                action: newProductAction
            },
        ]
    }
])