import { Options } from '@mikro-orm/core';

const options: Options = {
    host: 'postgres',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    dbName: 'postgres',
    entities: ['dist/src/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    type: 'postgresql',
    persistOnCreate: true,
};

export default options;