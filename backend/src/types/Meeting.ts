import { DateTimeType } from '@mikro-orm/core';
import { MeetingDate } from '../entities/MeetingDate.entity';

export interface Meeting {
    name: string;
    password: string;
    start_time: DateTimeType;
    end_time: DateTimeType;
    active: boolean;
    dates: MeetingDate[];
}