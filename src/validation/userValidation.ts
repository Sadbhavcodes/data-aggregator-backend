import {z} from 'zod';

export const signupSchema  = z.object({
    body: z.object({
        username: z.string()
                    .min(3, "Username must be atleast 3 characters")
                    .max(20, "Username must be less than 20 characters")
                    .regex(/^[a-zA-Z0-9_]+$/, "Username must be alphanumeric and can contain underscores"),
        email: z.string()
                .email("Invalid email address")
                .toLowerCase(),

        password: z.string()
                    .min(8, "Password must be atleast 8 characters")
                    .max(16, "Password must be less than 16 characters")
                    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                    .regex(/[0-9]/, "Password must contain at least one number")
                    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
        
        role: z.enum(['user', 'admin']).optional().default('user')
    })
})

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email"),
        password: z.string().min(1, "Password cannot be empty")
    })
})
