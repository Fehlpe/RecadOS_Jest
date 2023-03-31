import { UserRepository } from "../../../../src/app/features/user/repositories/user.repository";
import { CreateUserUseCase } from "../../../../src/app/features/user/usecases/createUser.usecase";
import { User } from "../../../../src/app/models/user.model";
import { DataBaseConnection } from "../../../../src/main/database/typeorm.connection";

describe("Get growdever usecase test", () => {
  beforeAll(async () => {
    await DataBaseConnection.connect();
  });

  afterAll(async () => {
    await DataBaseConnection.destroy();
  });

  const makeSut = () => {
    return new CreateUserUseCase(new UserRepository());
  };

  test("Deveria existir um retorno", async () => {
    const user = new User("Felipe", "123", "teste@teste");

    jest.spyOn(UserRepository.prototype, "createUser").mockResolvedValueOnce();
    const sut = makeSut();
    const result = await sut.execute(user);

    expect(result).not.toBeNull();
  });
});
