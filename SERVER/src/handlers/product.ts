import { Request, Response } from "express"
import Product from "../models/Product.model"

export const getProducts = async(req: Request, res: Response)=> {
    const products = await Product.findAll({
            order: [
                ['id', 'ASC']
            ],
            attributes: {exclude:['createdAt','updatedAt' ]}
        })
        res.json({data: products})
}
export const getProductById = async(req: Request, res: Response)=> {
    const {id} = (req.params)
        const product = await Product.findByPk(id)
        if(!product){
            return res.status(404).json({error:'Producto no encontrado'})
        }
        res.status(200).json({data: product})
}
export const createProduct = async(req: Request, res: Response)=> {
    const product = await Product.create(req.body)
        res.status(201).json({data: product})
}
export const updateProduct = async (req: Request, res: Response)=> {
    const {id} = (req.params)
        const product = await Product.findByPk(id)
        if(!product){
            return res.status(404).json({error:'Producto no encontrado'})
        }
        await product.update(req.body)
        await product.save()
        res.json({data: product})
}
export const updateAvailability = async (req: Request, res: Response)=> {
    const {id} = (req.params)
        const product = await Product.findByPk(id)
        if(!product){
            return res.status(404).json({error:'Producto no encontrado'})
        }
        //cambio es estado del producto en automatico
        product.availability = !product.dataValues.availability
        await product.save()
        res.json({data: product})
}
export const deleteProduct = async (req: Request, res: Response)=> {
    const {id} = (req.params)
        const product = await Product.findByPk(id)
        if(!product){
            return res.status(404).json({error:'Producto no encontrado'})
        }
        await product.destroy()
        res.json({data: 'Producto eliminado'})
}