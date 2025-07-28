import { useNavigate, Form, type ActionFunctionArgs, redirect, useFetcher } from "react-router-dom";
import type { Product } from "../types";
import { formatCurrency } from "../helpers";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProp = {
    product: Product
}

export async function action({params}: ActionFunctionArgs) {
    if(params.id !== undefined){
        deleteProduct(+params.id)
        return redirect('/')
    }
}

export default function ProductDetails({ product }: ProductDetailsProp) {

    //hook para redirigir al usuario desde cualquier btn
    const navigate = useNavigate()
    const isAvailable = product.availability
    //para realizar una accion sin redireccionar
    const fetcher = useFetcher()

    return (
        
        <tr className="border-b ">
            {/* NOMBRE */}
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            {/* PRECIO */}
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            {/* EDITAR DISPONIBILIDAD */}
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="post">
                    
                    <button type="submit"
                        name="id" 
                        value={product.id}
                        className={`${isAvailable?'text-black' : 'text-red-600'} 
                        rounded-lg p-2 text-sm uppercase font-bold w-full border hover:cursor-pointer`}
                        >{isAvailable ? 'Disponible' : 'No Disponible'}
                    </button>
                </fetcher.Form>
            </td>
            {/* EDITAR */}
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`/productos/${product.id}/editar`)}
                        className="bg-indigo-600 text-white text-center w-full rounded-lg uppercase text-xs p-2 font-bold"
                        >Editar
                    </button>
                    {/* ELIMINAR */}
                    <Form className="w-full"
                    //pongo la misma url que en el router para poder realizar la peticion http
                        method="post" action={`/productos/${product.id}/eliminar`}
                        onSubmit={(e) => { 
                            //Confimar la eliminacion del producto
                            if(!confirm('Eliminar')) e.preventDefault() 
                        }}
                    >
                        <input type="submit"
                            value='Eliminar'
                            className="bg-red-600 text-white text-center w-full rounded-lg uppercase text-xs p-2 font-bold"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    )
}
