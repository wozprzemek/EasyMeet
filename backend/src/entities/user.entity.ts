import { Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { Availability } from './Availability.entity';
import { Meeting } from './Meeting.entity';

@Entity()
export class User {
    @PrimaryKey({columnType: 'uuid'})
    id = uuidv4();

    @Property({length: 50})
    username!: string;

    @ManyToOne(() => Meeting)
    meeting!: Meeting;

    @OneToMany(() => Availability, a => a.user, { cascade: [Cascade.ALL] })
    dates = new Collection<Availability>(this);

    constructor(username: string) {
        this.username = username;
    }
}