// 1. Import necessary files
import { EntertainmentBase } from "../interfaces/EntertainmentBase";
import { Schema, model } from 'mongoose';

// 2. Create the required inetrfaces for subsets of entertainment
export interface Movie extends EntertainmentBase {
    movie_name: string;
    category: 'movie';
}

export interface Concert extends EntertainmentBase {
    artist_name: string;
    category: 'concert';
}

// 3. A type to differentiate between movie and concert data
type EntertainmentDocument = Movie | Concert;

//4. Define the database schema 
const entertainmentSchema = new Schema<EntertainmentDocument>({
    id: { type: String, required: true },
    price: { type: Number, required: true },

    provider: { type: String, required: true },

    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },

    city: { type: String, required: true },

    category: {
        type: String,
        required: true,
        enum: ['movie', 'concert']
    },
    availableSeats: { type: Number, required: true },
    movie_name: { type: String },
    artist_name: { type: String }
}, { timestamps: true, strict: false });

export const EntertainmentModel = model<EntertainmentDocument>('Entertainment', entertainmentSchema)