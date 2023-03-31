import { RedisConnection } from "./database/redis.connection";
import { DataBaseConnection } from "./database/typeorm.connection";
import { runServer } from "./server/express.server";

Promise.all([DataBaseConnection.connect(), RedisConnection.connect()]).then(
  runServer
);
