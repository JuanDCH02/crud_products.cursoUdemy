import type { Product } from "../types"

type ProductFormProps = {
    product?: Product
}


export default function ProductForm({product}: ProductFormProps) {
    return (
    <>
        <div className="mb-4">
            <label htmlFor="name"
                className="text-gray-800"
                >Nombre Producto:
            </label>
            <input type="text" name="name"
                placeholder="nombre del producto"
                className="mt-2 block w-full p-3 bg-gray-50"
                defaultValue={product?.name}
            />
            <label htmlFor="price"
                className="text-gray-800"
                >Precio:
            </label>
            <input type="number" name="price"
                placeholder="precio del producto"
                className="mt-2 block w-full p-3 bg-gray-50"
                defaultValue={product?.price}
            />
        </div>
    </>
    )
}
