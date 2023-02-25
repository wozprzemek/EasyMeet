import { Availability } from "features/CreateMeeting/types";
import { MeetingDate } from "./MeetingDate";

export interface Meeting {
    id: string;
    name: string;
    password: string;
    from: string;
    to: string;
    active: boolean;
    dates: MeetingDate[];
    availabilities: Availability[];
}