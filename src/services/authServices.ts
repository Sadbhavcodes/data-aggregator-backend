import bcrypt from 'bcrypt';
import { userModel } from "../models/User";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (id: string, role: string) => {
    return jwt.sign({id,role}, process.env.JWT_SECRET as string, {expiresIn: '7d'});
}

export const SignupService = async (
    username: string,
    email: string,
    password: string
) => {
    try{
        const userExists = await userModel.findOne({email});
        if(userExists){
            return {
                success: false,
                message: 'user already exists'
            }
        }
        const hashedPass = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashedPass,
            role: 'user'
        })
        const id = user._id.toString();
        const token = generateToken(id, user.role);
        
        return {
            success: true,
            message: 'user created successfully',
            token,
            user: {
                id,
                username,
                email,
                role: user.role
            }
        }
    }catch(error){
        console.error("Signup Service Error:", error);
        return {
            success: false,
            message: "Internal server error",
        }
    }
}
