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
        const hashedPass = await bcrypt.hash(password, 12);

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

export const loginService = async (
    email: string,
    password: string
) => {
    try{
        const userExist = await userModel.findOne({email}).select('+password');
        if(userExist){
            const isMatch = await bcrypt.compare(password, userExist.password as string);
            if(isMatch){
                const id = userExist._id.toString();
                const token = generateToken(id ,userExist.role);
                return {
                    success: true,
                    message: 'user logged in successfully',
                    token,
                    user: {
                        id,
                        username: userExist.username,
                        email: userExist.email,
                        role: userExist.role
                    }
                }
            }
            return {
                success: false,
                message: 'invalid credentials'
            }
        }   
        return {
            success: false,
            message: 'user not found'
        }
    }catch(error){
        console.error("Login Service Error:", error);
        return {
            success: false,
            message: "Internal server error",
        }
    }
}