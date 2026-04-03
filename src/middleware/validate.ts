import {Request, Response, NextFunction} from "express";
import {ZodTypeAny, ZodError, success} from 'zod';

export const validate = (schema: ZodTypeAny) => 
    async (req: Request, res: Response, next: NextFunction) => {
        try{
            schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            });
            return next();
        }catch(error){
            if(error instanceof ZodError){
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: error.issues.map((err) => ({
                        field: err.path[1] ?? err.path[0],
                        message: err.message
                    }))
                })
            }
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            })
        }
}