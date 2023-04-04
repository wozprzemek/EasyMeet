import * as z from 'zod';
import { MeetingDateRequest } from './MeetingDate.schema';

export const MeetingResponse = z.object({
    id: z.string().uuid(),
})

export const MeetingCreateRequestBody = z.object({
    name: z.string(),
    dates: z.array(MeetingDateRequest),
    from: z.string(),
    to: z.string(),
    active: z.boolean(),
})

export type MeetingCreateRequestBody = z.infer<typeof MeetingCreateRequestBody>
export type MeetingResponse = z.infer<typeof MeetingResponse>
