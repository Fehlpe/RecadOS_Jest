import { User } from "../../../models/user.model";
import { UserRepository } from "../repositories/user.repository";

export class LoginUserUsecase {
  constructor(private repository: UserRepository) {}

  public async execute(data: any) {
    const result = await this.repository.loginUser(data.email, data.password);

    return result;
  }
}
