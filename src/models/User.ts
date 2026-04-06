import {User, Admin, UserDocument} from '../interfaces/UserInterface';
import {Schema, model} from 'mongoose';

const userSchema = new Schema<UserDocument>({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    password: {type: String, required: true, select: false},
    // select false means dont add this field in find queries unless asked directly
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {timestamps: true, strict: false});
// strict means if we add any field in schema that is not defined in schema, it will throw an error so we keep it false 

export const userModel = model<UserDocument>('User', userSchema);