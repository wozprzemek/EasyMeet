import * as z from 'zod';

export const MeetingDateQuery = z.object({
    date: z.string().optional(),
    meeting: z.string().uuid().optional(),
})

export const MeetingDateRequest = z.object({
    date: z.string(),
})

export const MeetingDateResponse = z.object({
    id: z.string().uuid(),
    date: z.string(),
    meeting: z.string().uuid(),
})

export type MeetingDateQuery = z.infer<typeof MeetingDateQuery>
export type MeetingDateResponse = z.infer<typeof MeetingDateResponse>
export type MeetingDateRequest = z.infer<typeof MeetingDateRequest>
