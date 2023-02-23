import { Availability } from '../entities/Availability.entity';
import { Meeting } from '../entities/Meeting.entity';

export interface User {
    username: string;
    meeting: Meeting;
    availabilities: Availability[];
}