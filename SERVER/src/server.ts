import  express from "express";
import router from "./routes";
import db from "./config/db";

//instancia de Express
const  server = express()
//leer datos de formularios
server.use(express.json())
//seteo que rutas va a leer
server.use('/products', router)

// conexion a la db
export async function connectDb() {
    try {
        await db.authenticate()
        db.sync()
    } catch (error) {
        console.log('Error al conectar a la DB')
    }
}
connectDb()

server.get('/api', (req,res) =>{
    res.json({msg:'desde api'})
})

export default server;