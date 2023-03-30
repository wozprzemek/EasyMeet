import { Cascade, Collection, DateType, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { Availability } from './Availability.entity';
import { Meeting } from './Meeting.entity';

@Entity()
export class User {

    @PrimaryKey({ columnType: 'uuid' })
    id = uuidv4();

    @Property({ length: 50 })
    name!: string;

    @Property({ length: 100 })
    password: string;

    @ManyToOne(() => Meeting)
    meeting!: Meeting;

    @OneToMany(() => Availability, a => a.user, { cascade: [Cascade.ALL], orphanRemoval: true })
    availabilities = new Collection<Availability>(this);

    constructor(name: string, password: string, meeting: Meeting) {
        this.name = name;
        this.meeting = meeting;
        this.password = password;
    }
}