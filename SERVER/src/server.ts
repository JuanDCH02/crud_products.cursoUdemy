import express from "express";
import router from "./routes";
import cors,{ CorsOptions} from 'cors'
import morgan from 'morgan'
import db from "./config/db";
import swaggerUI, {SwaggerUiOptions} from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

//instancia de express
export const server = express();
//lectura de forms
server.use(express.json());
server.use(morgan('dev'))
//permitir conexiones
const corsOptions: CorsOptions = {
  origin: function(origin, callback){
    if(origin === process.env.FONTEND_URL){
      callback(null, true)
    }else{
      callback(new Error('Error de CORS'))
    }
  }
}
server.use(cors(corsOptions))
//docs
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions));
//rutas
server.use("/products", router);

// DB
export async function connectDb() {
  try {
    await db.authenticate();
    db.sync();
  } catch (error) {
    console.log("Error al conectar a la DB");
  }
}
connectDb();
