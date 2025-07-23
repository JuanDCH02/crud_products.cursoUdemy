import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"

export const handleInputErrors = (req:Request, res:Response, next: NextFunction) => {
    let errors = validationResult(req)
        //si hay errores no pasa la validacion 
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    next()
}

