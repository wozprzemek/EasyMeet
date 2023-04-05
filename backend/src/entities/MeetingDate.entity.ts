import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { Meeting } from './Meeting.entity';

@Entity()
export class MeetingDate {

    @PrimaryKey({ columnType: 'uuid', hidden: true })
    id = uuidv4();

    @PrimaryKey({ columnType: 'date' })
    date: string;

    @ManyToOne(() => Meeting, { hidden: true })
    meeting: Meeting;

    constructor(date: string, meeting: Meeting) {
        this.date = date;
        this.meeting = meeting;
    }
}