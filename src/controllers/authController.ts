import {Request, Response} from 'express';
import {SignupService, loginService} from '../services/authServices';

export const signup = async(req: Request, res: Response) => {
    try{
        const {username, email, password} = req.body;
        const result = await SignupService(username, email, password);
        if(result.success){
            res.cookie('token', result.token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            return res.status(200).json({
                success: true,
                message: result.message,
                user: result.user
            })
        }
        return res.status(400).json({
            message: result.message
        })
    }catch(error){
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const login = async (req: Request, res:Response) => {
    try{
        const {email, password} = req.body;
        const result = await loginService(email, password);
        if(result.success){
            res.cookie('token', result.token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            return res.status(200).json({
                success: true,
                message: result.message,
                user: result.user
            })
        }
        return res.status(400).json({
            message: result.message
        })
    }catch(error){
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const logout = async (req: Request, res: Response) => {
    try{
        res.clearCookie('token');
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    }catch(error){
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}