import { Schema, model } from 'mongoose';
import { TravelBase } from '../interfaces/TravelBase';

export interface Flight extends TravelBase {
    category: 'flight';
    flightNumber: string;
    airlineName: string;
}

export interface Train extends TravelBase {
    category: 'train';
    trainNumber: string;
    trainName: string;
}

type TravelDocument = Flight | Train;

const travelSchema = new Schema<TravelDocument>({
    id: { type: String, required: true },
    price: { type: Number, required: true },

    provider: { type: String, required: true },

    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },

    originLocation: { type: String, required: true },
    destinationLocation: { type: String, required: true },

    category: {
        type: String,
        required: true,
        enum: ['train', 'flight']
    },
    availableSeats: { type: Number, required: true },
}, { strict: false, timestamps: true });

export const TravelModel = model<TravelDocument>('Travel', travelSchema);