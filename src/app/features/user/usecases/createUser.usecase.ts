import { User } from "../../../models/user.model";
import { UserRepository } from "../repositories/user.repository";

export class CreateUserUseCase {
  constructor(private repository: UserRepository) {}

  public async execute(data: any) {
    const user = new User(data.username, data.password, data.email);

    const result = await this.repository.createUser(user);

    return result;
  }
}
