export interface DateType {
    day: number;
    month: number;
    year: number;
}

export interface Meeting {
    name: string;
    from: string;
    to: string;
    dates: DateType[];
    users: User[];
}

export interface Availability {
    user: string;
    time: string;
    meeting_id: string;
}

export interface User {
    id: string;
    name: string;
    password: string;
    meeting_id: string;
    availabilities?: Availability[];
}