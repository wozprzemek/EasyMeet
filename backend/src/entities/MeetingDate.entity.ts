import { Cascade, Check, DateTimeType, DateType, Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { Meeting } from './Meeting.entity';

@Entity()
export class MeetingDate {
    @PrimaryKey({columnType: 'date'})
    date!: DateType;

    @ManyToOne(() => Meeting, {primary: true, cascade: [Cascade.ALL]})
    meeting!: Meeting;

    constructor(date: DateType, meeting: Meeting){
        this.date = date;
        this.meeting = meeting;
    }
}