import { Link, Form, useActionData, type ActionFunctionArgs, redirect } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addproduct } from "../services/ProductService"

export async function action({request} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    let error = ''

    if(Object.values(data).includes('')){
      error = 'todos los campos son obligatorios'
    }
    if(error.length) return error
    //espero a que se inserte el producto antes de redireccionar al user
    await addproduct(data)
    return redirect('/')
}

export default function Newproduct() {

  const error = useActionData() as string

    return (
    <>
        <div className="flex justify-between">
            <h2 className="text-4xl font-black text-slate-500">Registrar Producto</h2>
        
            <Link to={'/'}
                className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white hover:bg-indigo-500">
                Volver a Productos      
            </Link>
        </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form action="" method="post" className="mt-10">
            <div className="mb-4">
                <label htmlFor="name"
                    className="text-gray-800"
                    >Nombre Producto:
                </label>
                <input type="text" name="name"
                    placeholder="nombre del producto"
                    className="mt-2 block w-full p-3 bg-gray-50"
                />

                <label htmlFor="price"
                    className="text-gray-800"
                    >Precio:
                </label>
                <input type="number" name="price"
                    placeholder="precio del producto"
                    className="mt-2 block w-full p-3 bg-gray-50"
                />
            </div>

            <input type="submit" 
                className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
            />
        </Form>
    </>
  )
}
