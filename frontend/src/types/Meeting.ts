import { Availability, User } from "views/CreateMeeting/types";
import { MeetingDate } from "./MeetingDate";

export interface Meeting {
    id: string;
    name: string;
    from: string;
    to: string;
    active: boolean;
    dates: MeetingDate[];
    users: User[];
    // availabilities: { [key: string]: Availability[] };

}