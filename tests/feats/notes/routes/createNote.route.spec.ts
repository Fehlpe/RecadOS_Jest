import { createServer } from "../../../../src/main/config/server.config";
import { RedisConnection } from "../../../../src/main/database/redis.connection";
import { DataBaseConnection } from "../../../../src/main/database/typeorm.connection";
import request from "supertest";

describe("Create note route", () => {
  beforeAll(async () => {
    await DataBaseConnection.connect();
    await RedisConnection.connect();
  });

  afterAll(async () => {
    await DataBaseConnection.destroy();
    await RedisConnection.destroy();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const server = createServer();

  test("deve retornar 500 quando não tiver user_id", async () => {
    const result = await request(server).post("/note").send({
      title: "TESTE",
      description: "testeteste",
    });

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(500);
    expect(result.body.message).toBe(
      `QueryFailedError: null value in column \"user_id\" of relation \"notes\" violates not-null constraint`
    );
  });

  test("deve retornar 500 quando não tiver description", async () => {
    const result = await request(server).post("/note").send({
      title: "TESTE",
      user_id: "1231231",
    });

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(500);
    expect(result.body.message).toBe(
      `QueryFailedError: null value in column \"description\" of relation \"notes\" violates not-null constraint`
    );
  });

  test("deve retornar 500 quando não tiver title", async () => {
    const result = await request(server).post("/note").send({
      description: "testeteste",
      user_id: "1231231",
    });

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(500);
    expect(result.body.message).toBe(
      `QueryFailedError: null value in column \"title\" of relation \"notes\" violates not-null constraint`
    );
  });
});
