import {Schema, model} from 'mongoose';
import { TravelBase } from '../interfaces/TravelBase';
import strict from 'node:assert/strict';
import { timeStamp } from 'node:console';

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
    id: {type: String, required : true},
    price: {type: Number, required: true},

    provider: {type: String, required: true},

    date: {type: Date, required: true},
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},

    originLocation : {type: String, required: true},
    destinationLoction : {type: String, required: true},

    category: {
        type: String,
        required: true,
        enum: ['movie', 'concert']
    },
    availableSeats : {type: Number, required: true},
},{strict: false,timeStamp: true });

export const TravelModel = model<TravelDocument>('Travel', travelSchema);