import {DraftProductSchema, Products, type Product, ProductSchema} from '../types'
import { safeParse } from 'valibot'
import axios from 'axios'
import { toBoolean } from '../helpers';

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export async function addproduct(data : ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: Number(data.price)
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/products/`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        }else{
            throw new Error('Datos no validos')
        }
    }catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/products/`
        const {data} = await axios(url)
        const result = safeParse(Products, data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un problema...')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/products/${id}`
        const {data} = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un problema...')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data:ProductData, id: Product['id']) {
    try {
        const result = safeParse(ProductSchema, {
            id,
            name:data.name,
            price:Number(data.price),
            availability: toBoolean(data.availability.toString())
        })
        
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/products/${id}`      
            await axios.put(url, result.output) 
        }else{
            throw new Error('Hubo un problema...')
        }
    } catch (error) {
        console.log(error)
    }
}