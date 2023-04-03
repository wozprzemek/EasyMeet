import * as z from 'zod';

export const IdParams = z.object({
    id: z.string().uuid(),
})

export type IdParams = z.infer<typeof IdParams>
