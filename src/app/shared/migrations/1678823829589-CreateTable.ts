import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateTable1678823829589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "notes",
        columns: [
          {
            name: "note_id",
            type: "varchar",
            isPrimary: true,
            isNullable: false,
            length: "50",
          },
          {
            name: "title",
            type: "varchar",
            length: "30",
            isNullable: false,
          },
          {
            name: "description",
            type: "varchar",
            length: "120",
            isNullable: false,
          },
          {
            name: "archived",
            type: "boolean",
            isNullable: false,
            default: false,
          },
          {
            name: "user_id",
            type: "varchar",
            length: "50",
            isNullable: false,
            isUnique: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            isNullable: false,
            default: "current_timestamp",
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: false,
            default: "current_timestamp",
          },
        ],
        foreignKeys: [
          {
            name: "FK_users_user_id",
            referencedTableName: "users",
            referencedColumnNames: ["user_id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );

    await queryRunner.createIndex(
      "notes",
      new TableIndex({
        name: "idx_note_id",
        columnNames: ["note_id"],
        isUnique: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("notes", true, true, true);
  }
}
