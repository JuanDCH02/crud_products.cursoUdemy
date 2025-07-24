import express from "express";
import router from "./routes";
import db from "./config/db";
import swaggerUI, {SwaggerUiOptions} from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

export const server = express();
server.use(express.json());

server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions));

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
