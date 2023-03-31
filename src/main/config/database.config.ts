import { DataSource } from "typeorm";
import "dotenv/config";
import { UserEntity } from "../../app/shared/entities/users.entity";
import { NoteEntity } from "../../app/shared/entities/notes.entity";
import { CreateTable1678823797273 } from "../../app/shared/migrations/1678823797273-CreateTable";
import { CreateTable1678823829589 } from "../../app/shared/migrations/1678823829589-CreateTable";

let dataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  entities: [UserEntity, NoteEntity],
  migrations: [CreateTable1678823797273, CreateTable1678823829589],
  schema: "public",
});

if (process.env.NODE_ENV === "test") {
  dataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite3",
    synchronize: false,
    entities: [UserEntity, NoteEntity],
    migrations: [CreateTable1678823797273, CreateTable1678823829589],
  });
}

export default dataSource;
