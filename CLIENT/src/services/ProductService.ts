import {DraftProductSchema} from '../types'
import { safeParse } from 'valibot'
import axios from 'axios'

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
