import { DataBaseConnection } from "../../../../src/main/database/typeorm.connection";
import { createServer } from "../../../../src/main/config/server.config";
import request from "supertest";
import { FindUserByEmail } from "../../../../src/app/features/user/usecases/findUserByEmail.usecase";
import { checkPasswordsValidator } from "../../../../src/app/features/user/validators/checkPasswords.validator";
import { User } from "../../../../src/app/models/user.model";
import { createUserValidator } from "../../../../src/app/features/user/validators/createUser.validator";
import { CreateUserUseCase } from "../../../../src/app/features/user/usecases/createUser.usecase";

describe("Rota de criar um user", () => {
  const user = new User("Felipe", "123", "a@a");

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

  test("Deveria retornar erro 400 ao tentar inserir sem o nome", async () => {
    const result = await request(server).post("/user").send({
      email: "ads@ads",
      password: "123",
      password2: "123",
    });

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(400);
    expect(result.body.message).toBe("Username not provided");
  });

  test("Deveria retornar erro 400 ao tentar inserir sem a senha", async () => {
    const result = await request(server).post("/user").send({
      username: "Felipe",
      email: "ads@ads",
    });

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(400);
    expect(result.body.message).toBe("Password not provided");
  });

  test("Deveria retornar erro 400 ao tentar inserir sem o email", async () => {
    const result = await request(server).post("/user").send({
      username: "Felipe",
      password: "123",
      password2: "123",
    });

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(400);
    expect(result.body.message).toBe("Email not provided");
  });

  test("Deveria retornar erro 401 ao tentar inserir senhas diferentes", async () => {
    const result = await request(server).post("/user").send({
      username: "Felipe",
      email: "teste@teste",
      password: "123",
      password2: "456",
    });

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(401);
    expect(result.body.message).toBe("Passwords don't match");
  });

  test("deve retornar 409 se o user já existe com o mesmo email", async () => {
    jest.spyOn(FindUserByEmail.prototype, "execute").mockResolvedValue(user);

    const result = await request(server).post("/user").send({
      username: "Teste",
      email: "a@a",
      password: "123",
      password2: "123",
    });

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(409);
    expect(result.body.message).toBe("a@a already registered");
    expect(result.body).toEqual({
      ok: false,
      message: "a@a already registered",
    });
  });

  test("Deveria chamar o next() quando senhas são comparadas", async () => {
    const mockNext = jest.fn();
    const req: any = {
      body: { email: "aa@aa", password: "123", password2: "123" },
    };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    await checkPasswordsValidator(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  test("Deve retornar erro 500 quando ocorrer um erro interno no checkDuplicateUser", async () => {
    jest.spyOn(FindUserByEmail.prototype, "execute").mockImplementation(() => {
      throw new Error("Erro de Teste");
    });

    const result = await request(server).post("/user").send({
      username: "Teste",
      email: "a@a",
      password: "123",
      password2: "123",
    });

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(500);
    expect(result.body.ok).toBe(false);
  });

  test("Deveria retornar erro 500 quando ocorrer um erro interno no checkPasswords", async () => {
    const mockNext = jest.fn(() => {
      throw new Error("Erro de teste");
    });
    const req: any = {
      body: { email: "aa@aa", password: "123", password2: "123" },
    };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    await checkPasswordsValidator(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("Deveria retornar erro 500 quando ocorrer um erro interno no createUser", async () => {
    const mockNext = jest.fn(() => {
      throw new Error("Erro de teste");
    });
    const req: any = {
      body: {
        username: "Felipe",
        email: "aa@aa",
        password: "123",
        password2: "123",
      },
    };
    const res: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    await createUserValidator(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
