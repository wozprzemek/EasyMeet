import { Migration } from '@mikro-orm/migrations';

export class Migration20230220190343 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "meeting" add column "name" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "meeting" drop column "name";');
  }

}
