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

export const AvailabilityRequest = z.object({
    time: z.string().datetime(),
})

export const AvailabilityUpdateRequestBody = z.object({
    user: z.string().uuid(),
    password: z.string(),
    availabilities: z.array(AvailabilityRequest),
})

export type AvailabilityQuery = z.infer<typeof AvailabilityQuery>
export type AvailabilityUpdateRequestBody = z.infer<typeof AvailabilityUpdateRequestBody>
export type AvailabilityResponse = z.infer<typeof AvailabilityResponse>
export type AvailabilityRequest = z.infer<typeof AvailabilityRequest>
