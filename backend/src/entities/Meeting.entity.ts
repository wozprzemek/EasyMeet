import { Cascade, Check, Collection, DateTimeType, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { MeetingDate } from './MeetingDate.entity';
import { User } from './User.entity';

@Entity()
export class Meeting {
  @PrimaryKey({ columnType: 'uuid' })
  id = uuidv4();

  @Property({ length: 100 })
  name!: string;

  @OneToMany(() => MeetingDate, md => md.meeting, { cascade: [Cascade.ALL], orphanRemoval: true })
  dates = new Collection<MeetingDate>(this);

  @OneToMany(() => User, u => u.meeting, { cascade: [Cascade.ALL], orphanRemoval: true })
  users = new Collection<User>(this);

  @Property({ columnType: 'timestamp with time zone' })
  @Check({ expression: '(EXTRACT (MINUTE FROM "from") IN (0, 30)) AND (EXTRACT (SECOND FROM "from") = 0)' })
  from!: string;

  @Property({ columnType: 'timestamp with time zone' })
  @Check({ expression: '(EXTRACT (MINUTE FROM "to") IN (0, 30)) AND (EXTRACT (SECOND FROM "to") = 0) AND ("to" > "from")' })
  to!: string;

  @Property({ default: true })
  active: boolean = true

  constructor(name: string, from: string, to: string, active: boolean) {
    this.name = name;
    this.from = from;
    this.to = to;
    this.active = active;
  }
}