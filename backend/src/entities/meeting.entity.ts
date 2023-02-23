import { Cascade, Check, Collection, DateTimeType, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { MeetingDate } from './MeetingDate.entity';
import { User } from './User.entity';

@Entity()
export class Meeting {
    @PrimaryKey({columnType: 'uuid'})
    id = uuidv4();

    @Property({length: 100})
    name!: string;

    @Property({length: 100})
    password?: string;

    @OneToMany(() => MeetingDate, md => md.meeting, { cascade: [Cascade.ALL], orphanRemoval: true })
    dates = new Collection<MeetingDate>(this);

    @OneToMany(() => User, u => u.meeting, { cascade: [Cascade.ALL], orphanRemoval: true })
    users = new Collection<User>(this);

    @Property({columnType: 'timestamp with time zone'})
    @Check({ expression: '(EXTRACT (MINUTE FROM start_time) IN (0, 30)) AND (EXTRACT (SECOND FROM start_time) = 0)' })
    start_time!: DateTimeType;

    @Property({columnType: 'timestamp with time zone'})
    @Check({ expression: '(EXTRACT (MINUTE FROM end_time) IN (0, 30)) AND (EXTRACT (SECOND FROM end_time) = 0) AND (end_time > start_time)' })
    end_time!: DateTimeType;

    @Property({default: true})
    active: boolean = true

    constructor(name: string, start_time: DateTimeType, end_time: DateTimeType, active: boolean, password?: string) {
        this.name = name;
        this.start_time = start_time;
        this.end_time = end_time;
        this.active = active;
        this.password = password
      }
}