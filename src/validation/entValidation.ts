import { z } from 'zod';

const commonQuery = {
    city: z.string().min(1, "City cannot be empty"),
    date: z.coerce.date({
        message: "Invalid date format"
    }).refine((date) => date > new Date(), {
        message: "Date must be in the future"
    })
};

export const movieSearchSchema = z.object({
    query: z.object({
        ...commonQuery,
        title: z.string().min(1, "Title cannot be empty")
    })
})

export const concertSearchSchema = z.object({
    query: z.object({
        ...commonQuery,
        artist_name: z.string().min(1, "Artist name cannot be empty"),
    })
})