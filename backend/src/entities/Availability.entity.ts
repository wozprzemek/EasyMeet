import { Check, DateTimeType, Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { Meeting } from './Meeting.entity';

@Entity()
export class Availability {
    @PrimaryKey({ columnType: 'uuid' })
    id = uuidv4();

    @ManyToOne(() => Meeting)
    meeting!: Meeting;

    @Property({ length: 50 })
    user!: string;

    @Property({ columnType: 'timestamp with time zone' })
    @Check({ expression: '(EXTRACT (MINUTE FROM "time") IN (0, 30)) AND (EXTRACT (SECOND FROM "time") = 0)' })
    time!: DateTimeType;

    constructor(user: string, time: DateTimeType, meeting: Meeting) {
        this.user = user;
        this.time = time;
        this.meeting = meeting;
    }
}