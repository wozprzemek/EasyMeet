import { Check, Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { User } from './User.entity';

@Entity()
export class Availability {
    @PrimaryKey({ columnType: 'uuid', hidden: true })
    id = uuidv4();

    @ManyToOne(() => User, { hidden: true })
    user!: User;

    @Property({ columnType: 'timestamp with time zone' })
    @Check({ expression: '(EXTRACT (MINUTE FROM "time") IN (0, 30)) AND (EXTRACT (SECOND FROM "time") = 0)' })
    time!: string; // consider DateTimeType

    constructor(user: User, time: string) {
        this.user = user;
        this.time = time;
    }
}