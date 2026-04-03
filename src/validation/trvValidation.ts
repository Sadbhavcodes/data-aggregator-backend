import { z } from 'zod';

export const travelSearchSchema = z.object({
    query: z.object({
        origin: z.string().min(1, "Origin cannot be empty"),
        destination: z.string().min(1, "Destination cannot be empty"),
        date: z.coerce.date({
            message: "Invalid date format"
        }).refine((date) => date > new Date(), {
            message: "Date must be in the future"
        })
    })
})
