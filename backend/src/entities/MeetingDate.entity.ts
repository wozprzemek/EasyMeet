import { DateType, Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { Meeting } from './Meeting.entity';

@Entity()
export class MeetingDate {

    @PrimaryKey({ columnType: 'uuid' })
    id = uuidv4();

    @PrimaryKey({ columnType: 'date' })
    date!: DateType;

    @ManyToOne(() => Meeting, { primary: true })
    meeting!: Meeting;

    constructor(date: DateType, meeting: Meeting) {
        this.date = date;
        this.meeting = meeting;
    }
}