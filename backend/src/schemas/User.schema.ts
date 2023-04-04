import * as z from 'zod';

export const UserQuery = z.object({
    name: z.string().optional(),
    meeting: z.string().uuid().optional(),
})

export const UserResponse = z.object({
    id: z.string().uuid(),
    time: z.string().datetime(),
    user: z.string().uuid(),
})

export const UserRequest = z.object({
    time: z.string().datetime(),
})

export const UserLoginOrCreateRequestBody = z.object({
    name: z.string(),
    password: z.string(),
    meeting: z.string().uuid(),
})

export type UserQuery = z.infer<typeof UserQuery>
export type UserLoginOrCreateRequestBody = z.infer<typeof UserLoginOrCreateRequestBody>
export type UserResponse = z.infer<typeof UserResponse>
export type UserRequest = z.infer<typeof UserRequest>
