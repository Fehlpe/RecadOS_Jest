import { DataSource } from "typeorm";
import { appEnv } from "../../app/envs/app.env";
import { NoteEntity } from "../../app/shared/entities/notes.entity";
import { UserEntity } from "../../app/shared/entities/users.entity";

export default new DataSource({
  type: "postgres",
  url: appEnv.dbUrl,
  entities: [UserEntity, NoteEntity],
  migrations: ["src/app/shared/migrations/**/*ts"],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
});
