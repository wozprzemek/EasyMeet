export interface DateType {
    day: number;
    month: number;
    year: number;
}

export interface Meeting {
    name: string;
    password?: string;
    from: string;
    to: string;
    dates: DateType[];
    availabilities?: Availability[];
}

export interface Availability {
    user: string;
    time: string;
    meeting_id: string;
}