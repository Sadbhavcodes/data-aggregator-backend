import { userModel } from "../models/User";
import {Request, Response} from 'express';
import {SignupService} from '../services/authServices';

export const signup = async(req: Request, res: Response) => {
    try{
        const {username, email, password} = req.body;
        const result = await SignupService(username, email, password);

    }catch(error){

    }
}

export const login = async (req: Request, res:Response) => {
    try{
        const {email, password} = req.body;
    }catch(error){

    }
}