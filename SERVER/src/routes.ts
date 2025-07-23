import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()


//routing 
router.get('/', getProducts)

router.get('/:id',
    param('id')
        .isInt().withMessage('ID no valido'), 
    handleInputErrors,
    getProductById)

router.post('/',
        //validacion
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio')
        .isNumeric().withMessage('precio no valido')
        .custom(value => value > 0).withMessage('precio no valido'),
        //llamada a funcion
    handleInputErrors,
    createProduct)

router.put('/:id',
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio')
        .isNumeric().withMessage('valor no valido')
        .custom(value => value > 0).withMessage('precio no valido'),
    body('availability')
        .isBoolean().withMessage('estado no valido'),
    handleInputErrors,
    updateProduct)

router.patch('/:id', 
    param('id')
        .isInt().withMessage('ID no valido'), 
    handleInputErrors,
    updateAvailability)

router.delete('/:id',
    param('id')
        .isInt().withMessage('ID no valido'), 
    handleInputErrors,
    deleteProduct
 )

export default router;