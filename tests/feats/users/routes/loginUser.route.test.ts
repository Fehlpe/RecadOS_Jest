import { DataBaseConnection } from "../../../../src/main/database/typeorm.connection";
import { createServer } from "../../../../src/main/config/server.config";
import request from "supertest";
import { LoginUserUsecase } from "../../../../src/app/features/user/usecases/loginUser.usecase";
import { UserEntity } from "../../../../src/app/shared/entities/users.entity";
import { faker } from "@faker-js/faker";

describe("Login Users route test", () => {
  const userCreatedAt = new Date("2023-03-01T01:31:34.848Z");
  const userUpdatedAt = new Date("2023-03-01T01:31:34.848Z");

  const user: UserEntity = {
    userId: "1111",
    userPassword: "123",
    userEmail: "felpearcanjo@gmail.com",
    userName: "Fehlpe",
    userCreatedAt,
    userUpdatedAt,
  } as UserEntity;

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

  test("Deve retornar status 200 se o usuario for criado", async () => {
    jest.spyOn(LoginUserUsecase.prototype, "execute").mockResolvedValue(user);
    const result = await request(server).post("/user/login").send({
      email: "felpearcanjo@gmail.com",
      password: "123",
    });
    expect(result).toBeDefined();
    expect(result.body.message).toBe("logged");
    expect(result.statusCode).toBe(201);
    expect(result.body).toHaveProperty("ok");
    expect(result.body.ok).toBeTruthy();
  });

  test("Deve retornar status 500 se tiver erro", async () => {
    jest.spyOn(LoginUserUsecase.prototype, "execute").mockImplementation(() => {
      throw new Error("Erro de Teste");
    });
    const result = await request(server).post("/user/login").send({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    expect(result).toBeDefined();
    expect(result.statusCode).toBe(500);
    expect(result.body).toHaveProperty("ok");
    expect(result.body).toHaveProperty("message");
    expect(result.body.ok).toBe(false);
    expect(result.body.message).toEqual(new Error("Erro de Teste").toString());
  });
});
