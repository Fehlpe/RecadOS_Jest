import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateTable1678823797273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "user_id",
            type: "varchar",
            isPrimary: true,
            isNullable: false,
            length: "50",
          },
          {
            name: "password",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "username",
            type: "varchar",
            length: "50",
            isNullable: false,
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
      })
    );

    await queryRunner.createIndex(
      "users",
      new TableIndex({
        name: "idx_user_id",
        columnNames: ["user_id"],
        isUnique: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users", true, true, true);
  }
}
