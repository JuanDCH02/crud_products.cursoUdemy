import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the product
 *           example: 1
 *         name:
 *           type: string
 *           description: Name of the product
 *           example: Monitor de 24 pulgadas
 *         price:
 *           type: number
 *           format: float
 *           description: Price of the product in local currency
 *           example: 400000
 *         availability:
 *           type: boolean
 *           description: Whether the product is available for purchase
 *           example: true
 */


/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags:
 *       - Products
 *     description: Returns a list of products
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts)

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request - Invalid ID
 */
router.get('/:id',
    param('id')
        .isInt().withMessage('ID no valido'), 
    handleInputErrors,
    getProductById)


/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     description: Return a new record in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string
 *                 example: 'Monitor Curvo'
 *               price: 
 *                 type: integer
 *                 example: 400000
 *     responses:
 *       201:
 *         description: Product updated successfully
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - Invalid input data
 */
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

/**
 * @swagger
 * /products:
 *   put:
 *     summary: Updates a product with user input
 *     tags:
 *       - Products
 *     description: Returns the updated product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string
 *                 example: 'Monitor Curvo'
 *               price: 
 *                 type: integer
 *                 example: 400000
 *               availability: 
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - Invalid input data
 *       404:
 *         description: Product not found
 */
router.put('/:id',
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .isNumeric().withMessage('valor no valido')
        .custom(value => value > 0).withMessage('precio no valido'),
    body('availability')
        .isBoolean().withMessage('estado no valido'),
    handleInputErrors,
    updateProduct)


/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Update product availability
 *     tags:
 *       - Products
 *     description: Returns the updated availability
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - Invalid id
 *       404:
 *         description: Product not found 
 */
router.patch('/:id', 
    param('id')
        .isInt().withMessage('ID no valido'), 
    handleInputErrors,
    updateAvailability)


/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a Product by a given ID
 *     tags:
 *       - Products
 *     description: Returns a confirmation message
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content: 
 *           application/json:
 *             schema:
 *               type: string
 *               value: 'Producto eliminado'
 *       400:
 *         description: Bad request - Invalid id
 *       404:
 *         description: Product not found 
 */
router.delete('/:id',
    param('id')
        .isInt().withMessage('ID no valido'), 
    handleInputErrors,
    deleteProduct
 )

export default router;