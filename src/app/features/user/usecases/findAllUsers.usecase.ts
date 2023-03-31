import { UserRepository } from "../repositories/user.repository";

export class FindAllUsers {
  constructor(private repository: UserRepository) {}

  public async execute() {
    const result = await this.repository.getAll();

    if (!result) {
      return null;
    }

    return result;
  }
}
