import { UserRepository } from "../repositories/user.repository";

export class FindUserByUserName {
  constructor(private repository: UserRepository) {}

  public async execute(username: string) {
    const result = await this.repository.getByUserName(username);

    if (!result) {
      return null;
    }
    return result.toJson();
  }
}
