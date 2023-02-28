import { Cascade, Check, Collection, DateTimeType, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { Availability } from './Availability.entity';
import { MeetingDate } from './MeetingDate.entity';

@Entity()
export class Meeting {
  @PrimaryKey({ columnType: 'uuid' })
  id = uuidv4();

  @Property({ length: 100 })
  name!: string;

  @Property({ length: 100 })
  password?: string;

  @OneToMany(() => MeetingDate, md => md.meeting, { cascade: [Cascade.ALL], orphanRemoval: true })
  dates = new Collection<MeetingDate>(this);

  @OneToMany(() => Availability, a => a.meeting, { cascade: [Cascade.ALL], orphanRemoval: true })
  availabilities = new Collection<Availability>(this);

  @Property({ columnType: 'timestamp with time zone' })
  @Check({ expression: '(EXTRACT (MINUTE FROM "from") IN (0, 30)) AND (EXTRACT (SECOND FROM "from") = 0)' })
  from!: DateTimeType;

  @Property({ columnType: 'timestamp with time zone' })
  @Check({ expression: '(EXTRACT (MINUTE FROM "to") IN (0, 30)) AND (EXTRACT (SECOND FROM "to") = 0) AND ("to" > "from")' })
  to!: DateTimeType;

  @Property({ default: true })
  active: boolean = true

  constructor(name: string, from: DateTimeType, to: DateTimeType, active: boolean, password?: string) {
    this.name = name;
    this.from = from;
    this.to = to;
    this.active = active;
    this.password = password
  }
}