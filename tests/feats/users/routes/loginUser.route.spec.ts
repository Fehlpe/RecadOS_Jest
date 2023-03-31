import { DataBaseConnection } from "../../../../src/main/database/typeorm.connection";
import { createServer } from "../../../../src/main/config/server.config";
import request from "supertest";
import { loginUserValidator } from "../../../../src/app/features/user/validators/loginUser.validator";
import { LoginUserUsecase } from "../../../../src/app/features/user/usecases/loginUser.usecase";
import { User } from "../../../../src/app/models/user.model";
import { UserEntity } from "../../../../src/app/shared/entities/users.entity";
import { faker } from "@faker-js/faker";

describe("loginUserValidator", () => {
  beforeAll(async () => {
    await DataBaseConnection.connect();
  });

  afterAll(async () => {
    await DataBaseConnection.destroy();
  });

  const server = createServer();

  test("Deveria retornar erro 404 ao não inserir email", async () => {
    const result = await request(server).post("/user/login").send({
      password: "123",
    });

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(404);
    expect(result.body.message).toBe("Email not provided");
    expect(result.body.ok).toBeFalsy();
  });

  test("Deveria retornar erro 404 ao não inserir senha", async () => {
    const result = await request(server).post("/user/login").send({
      email: "aa@aa",
    });

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(404);
    expect(result.body.message).toBe("Password not provided");
    expect(result.body.ok).toBeFalsy();
  });

  test("Deveria retornar erro 404 quando não existe o usuário", async () => {
    const result = await request(server).post("/user/login").send({
      email: faker.internet.email(),
      password: "123",
    });

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(404);
    expect(result.body.ok).toBe(false);
  });

  test("Deveria chamar o next() quando email e senha são informados", async () => {
    const mockNext = jest.fn();
    const req: any = { body: { email: "aa@aa", password: "123" } };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    await loginUserValidator(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  test("Deveria retornar erro 500 quando ocorrer um erro interno", async () => {
    const mockNext = jest.fn(() => {
      throw new Error("Erro interno");
    });
    const req: any = { body: { email: "aa@aa", password: "123" } };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    await loginUserValidator(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
