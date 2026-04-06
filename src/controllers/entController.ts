import {Request, Response} from "express";
import {EntertainmentModel} from "../models/Entertainment";
import {searchEngine} from "../services/searchEngine";

export const searchMovie = async (req: Request, res: Response) => {
    try{
        const title = req.query.title as string;
        const city = req.query.city as string;
        const date = req.query.date as unknown as Date;

        const category = 'movie';
        const result = await searchEngine(EntertainmentModel, {category, city, date}, [{field: 'movie_name', value: title, limit: 2}]);

        return res.status(200).json({
            success: true,
            message: "Movies found successfully",
            data: result
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

export const searchConcert = async (req : Request, res: Response) => {
    try{
        const artist_name = req.query.artist_name as string;
        const city = req.query.city as string;
        const date = req.query.date as unknown as Date;
        
        const category = 'concert';
        const result = await searchEngine(EntertainmentModel, {category, city, date}, [{field: 'artist_name', value: artist_name, limit: 2}]);

        return res.status(200).json({
            success: true,
            message: "Concerts found successfully",
            data: result
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}