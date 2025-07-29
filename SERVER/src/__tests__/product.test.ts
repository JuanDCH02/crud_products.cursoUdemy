import  request  from "supertest";
import {server} from "../server"


describe('POST /products', ()=> {
    //crear producto incorrecto
    it('should display validation errors', async()=>{
        const res = await request(server).post('/products').send({})
            //en una mala consulta espero un 400 y la propiedad 'errors'
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        
        expect(res.status).not.toBe(404)
    })
    //crear producto precio incorrecto (string o negativo)
    it('should validate price is valid', async()=>{
        const res = await request(server).post('/products').send({
            name: "mouse - testing",
            price: -13
        })
    
        expect(res.status).toBe(400)
        expect(res.body.errors[0].msg).toBe('precio no valido')
    })
    //crear producto correcto
    it('should create a new product', async () =>{
        const res = await request(server).post('/products').send({
            name: "mouse - testing",
            price: 67000
        })

            //cuando creo un producto espero un 201 y que tenga la propiedad 'data'
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('data')

            //cuando creo un producto no espero un 404/200 ni que tenga la propiedad 'errors'
        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products', () => {
    it('should check if api/products url exists', async () => {
        const response = await request(server).get('/products')
        expect(response.status).not.toBe(404)
    })
    it('GET a JSON response with products', async () => {
        const response = await request(server).get('/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /products/:id', ()=>{
    it('get a json response with products' , async ()=>{
        const res = await request(server).get('/products')
    
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body).toHaveProperty('data')
        
        expect(res.status).not.toBe(404)
    })
    it('should return 404 non-existing id', async()=>{
        const productId = 35400
        const res = await request(server).get(`/products/${productId}`)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('error')
    })
    it('should check a valid id in the url', async()=>{
        const res = await request(server).get(`/products/bad-url`)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors[0].msg).toBe('ID no valido')
    })
})

describe('PUT /products/:id', ()=>{
    it('should check a valid id in the url', async()=>{
        const res = await request(server).put(`/products/bad-url`).send({
            name: "mouse - testing",
            price: 120000
        })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
    })
    it('should display validation error messages when updating', async ()=>{
        const res = await request(server).put('/products/1').send({})

        expect(res.status).toBe(400)
        expect(res.body.errors).toBeTruthy()

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })
    it('validate price at updating', async ()=>{
        const res = await request(server).put('/products/1').send({
            name: "Monitor Curvo de 34 Pulgadas",
            price: -800,
            availability: true
        })
        expect(res.status).toBe(400)
        expect(res.body.errors).toBeTruthy()

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })
    it('should return a 404 response for a non-existent product', async() => {
        const productId = 2000
        const response = await request(server).put(`/products/${productId}`).send({
                                    name: "Monitor Curvo",
                                    availability: true,
                                    price : 300
                                })

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    it('should update a product', async () =>{
        const res = await request(server).put('/products/1').send({
            name: "mouse - testing - update",
            price: 67000,
            availability: true
        })
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')

        expect(res.status).not.toBe(404)
        expect(res.body).not.toHaveProperty('errors')
    })
})

describe('PATCH /products/:id', ()=>{
    it('404 for a non-existing id', async ()=>{
        const res = await request(server).patch('/products/3400')
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty("error")

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty("data")
    })
    it('should update the product availability', async ()=>{
        const res = await request(server).patch('/products/1')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("data")

        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty("error")
    })
})

describe('DELETE /products/:id', ()=> {
    it('should check a valid id in the url', async()=>{
        const res = await request(server).delete(`/products/bad-url`)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors[0].msg).toBe('ID no valido')

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })
    it('should return 404 non-existing id', async()=>{
        const productId = 33500
        const res = await request(server).delete(`/products/${productId}`)
        expect(res.status).toBe(404)
        expect(res.body.error).toBe("Producto no encontrado")

        expect(res.status).not.toBe(200)
    })
    it('should delete a product', async()=>{
        const res = await request(server).delete(`/products/1`)
        expect(res.status).toBe(200)
        expect(res.body.data).toBe("Producto eliminado")

        expect(res.status).not.toBe(400)
        expect(res.status).not.toBe(404)
    })
}) 