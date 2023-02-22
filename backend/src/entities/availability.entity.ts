import { Check, DateTimeType, Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { User } from './User.entity';

@Entity()
export class Availability {
    @PrimaryKey({columnType: 'uuid'})
    id = uuidv4();

    @Property({columnType: 'timestamp with time zone'})
    @Check({ expression: '(EXTRACT (MINUTE FROM "from") IN (0, 30)) AND (EXTRACT (SECOND FROM "from") = 0)' })
    from!: DateTimeType;

    @Property({columnType: 'timestamp with time zone'})
    @Check({ expression: '(EXTRACT (MINUTE FROM "to") IN (0, 30)) AND (EXTRACT (SECOND FROM "to") = 0) AND ("to" > "from") AND (DATE ("to") = DATE ("from"))' })
    to!: DateTimeType;
    
    @ManyToOne(() => User)
    user!: User;

    constructor(from: DateTimeType, to: DateTimeType, user: User) {
        this.from = from;
        this.to = to;
        this.user = user;
    }
}