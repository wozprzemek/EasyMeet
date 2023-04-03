import * as z from 'zod';

export const AvailabilityQuery = z.object({
    user: z.string().uuid().optional(),
    time: z.string().optional(),
})

export const AvailabilityResponse = z.object({
    id: z.string().uuid(),
    time: z.string().datetime(),
    user: z.string().uuid(),
})

export type AvailabilityQuery = z.infer<typeof AvailabilityQuery>
export type AvailabilityResponse = z.infer<typeof AvailabilityResponse>
