export interface BaseItem{
    id : string;
    price: number;

    provider: string;

    date: Date;
    startTime: Date;
    endTime: Date;

    availableSeats: number
}