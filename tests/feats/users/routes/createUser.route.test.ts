import { DataBaseConnection } from "../../../../src/main/database/typeorm.connection";
import { createServer } from "../../../../src/main/config/server.config";
import request from "supertest";
import { faker } from "@faker-js/faker";
import { User } from "../../../../src/app/models/user.model";

describe("Create Users route test", () => {
  beforeAll(async () => {
    await DataBaseConnection.connect();
  });

  afterAll(async () => {
    await DataBaseConnection.destroy();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const server = createServer();

  test("Deve retornar status 200 se a criage for feita com sucesso", async () => {
    const passwordTest = faker.internet.password();
    const result = await request(server).post("/user").send({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: passwordTest,
      password2: passwordTest,
    });
    expect(result).toBeDefined();
    expect(result.body.message).toBe("User created");
    expect(result.statusCode).toBe(200);
    expect(result.body).toHaveProperty("ok");
    expect(result.body.ok).toBeTruthy();
  });
});
