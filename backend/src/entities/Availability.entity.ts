import { Check, DateTimeType, Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { Meeting } from './Meeting.entity';
import { User } from './User.entity';

@Entity()
export class Availability {
    @PrimaryKey({ columnType: 'uuid' })
    id = uuidv4();

    @ManyToOne(() => User, { primary: true })
    user!: User;

    @Property({ columnType: 'timestamp with time zone' })
    @Check({ expression: '(EXTRACT (MINUTE FROM "time") IN (0, 30)) AND (EXTRACT (SECOND FROM "time") = 0)' })
    time!: DateTimeType;

    constructor(time: DateTimeType) {
        this.time = time;
    }
}