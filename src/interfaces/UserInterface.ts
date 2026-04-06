import { BaseUser } from "./BaseUser";

export interface User extends BaseUser{
    role: 'user';
}

export interface Admin extends BaseUser{
    role: 'admin';
}

export type UserDocument = User | Admin;
