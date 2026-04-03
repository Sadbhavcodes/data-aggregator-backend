import {Request, Response} from "express";
import {EntertainmentModel} from "../models/Entertainment";

export const searchMovie = async (req: Request, res: Response) => {
    try{
        const {title, city, date} = req.query;
        
    }catch(error){
    }
}

export const searchConcert = async (req : Request, res: Response) => {
    try{

    }catch(error){
    }
}