import { DateTimeType, DateType } from '@mikro-orm/core';

export interface User {
    username: string;
    password: string;
    start_time: DateTimeType;
    end_time: DateTimeType;
    active: boolean;
    dates: DateType[];
}