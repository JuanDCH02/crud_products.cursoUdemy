import  request  from "supertest";
import server, {connectDb} from "../server"

import db from "../config/db";

jest.mock('../config/db.ts')
describe('connectDb', ()=> {
    it('should handle db connection error', async () => {
        // espio el proceso de conexion a la base de datos
        jest.spyOn(db, 'authenticate')
        //fuerzo el catch de la conexion
            .mockRejectedValueOnce(new Error('Error al conectar a la DB'))
            //segundo espia en el catch de mi funcion
        const consoleSpy = jest.spyOn(console, 'log')
        await connectDb()
        //espero el manejo del error
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Error al conectar a la DB')
        )
    })
})