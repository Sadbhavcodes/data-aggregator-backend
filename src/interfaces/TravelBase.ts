import { BaseItem } from "./BaseItem";

export interface TravelBase extends BaseItem{
    originLocation: string;
    destinationLocation : string;
}