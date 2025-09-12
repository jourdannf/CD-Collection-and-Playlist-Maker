import * as z from 'zod';

export const userRegisterationSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(8),
    email: z.email()
});

export const sessionSchema = z.object({
    id: z.string()
});