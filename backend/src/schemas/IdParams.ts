import * as z from 'zod';

export const IdParams = z.object({
    id: z.string().uuid(),
})

export type AvailabilityQuery = z.infer<typeof IdParams>
