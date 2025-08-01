import { boolean, number, object, string, array, type InferOutput  } from "valibot";


export const DraftProductSchema = object({
    name:string(),
    price:number()
})
export const ProductSchema = object({
    id:number(),
    name:string(),
    price:number(),
    availability:boolean()
})
export const Products = array(ProductSchema)
export type Product = InferOutput<typeof ProductSchema>