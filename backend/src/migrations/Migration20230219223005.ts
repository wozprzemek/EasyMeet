import { Migration } from '@mikro-orm/migrations';

export class Migration20230219223005 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "availability" ("id" varchar(255) not null, constraint "availability_pkey" primary key ("id"));');

    this.addSql('create table "meeting" ("id" varchar(255) not null, constraint "meeting_pkey" primary key ("id"));');

    this.addSql('create table "user" ("id" varchar(255) not null, constraint "user_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "availability" cascade;');

    this.addSql('drop table if exists "meeting" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }

}
