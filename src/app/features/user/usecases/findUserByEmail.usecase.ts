import { UserRepository } from "../repositories/user.repository";

export class FindUserByEmail {
  constructor(private repository: UserRepository) {}

  public async execute(email: string) {
    const result = await this.repository.getByEmail(email);

    if (!result) {
      return null;
    }
    return result.toJson();
  }
}
