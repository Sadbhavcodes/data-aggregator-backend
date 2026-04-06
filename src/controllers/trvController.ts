import {Request, Response} from "express";
import { searchEngine } from "../services/searchEngine";
import { TravelModel } from "../models";

export const searchTravel = async (req: Request, res: Response) => {
    try{
        const from = req.query.origin as string;
        const to = req.query.destination as string;
        const date = req.query.date as unknown as Date;

        const category = req.path.includes('flights') ? 'flight' : 'train';

        const result = await searchEngine(TravelModel, {category, date}, [{field: 'origin', value: from, limit: 2}, {field: 'destination', value: to, limit: 2}]);

        return res.status(200).json({
            success: true,
            message: "Found successfully",
            data: result
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}