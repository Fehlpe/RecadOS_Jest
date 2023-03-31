import { DataBaseConnection } from "../../../../main/database/typeorm.connection";
import { User } from "../../../models/user.model";
import { UserEntity } from "../../../shared/entities/users.entity";

export class UserRepository {
  private _repository = DataBaseConnection.connection.getRepository(UserEntity);

  public async createUser(user: User) {
    const userEntity = this._repository.create({
      userPassword: user.password,
      userEmail: user.email,
      userName: user.username,
    });
    const result = await this._repository.save(userEntity);

    result;
  }

  public async loginUser(
    userEmail: string,
    userPassword: string
  ): Promise<UserEntity | null> {
    const userEntity = await this._repository.findOneBy({
      userEmail,
      userPassword,
    });

    return userEntity;
  }

  public async getByUserName(username: string) {
    const result = await this._repository.findOneBy({
      userName: username,
    });

    if (!result) {
      return null;
    }

    return this.mapEntityToModel(result);
  }
  public async getByEmail(email: string) {
    const result = await this._repository.findOneBy({
      userEmail: email,
    });

    if (!result) {
      return null;
    }

    return this.mapEntityToModel(result);
  }

  public async getAll() {
    const result = await this._repository.find();

    if (!result) {
      return null;
    }

    return result.map((user) => this.mapEntityToModel(user));
  }

  private mapEntityToModel(entity: UserEntity) {
    return User.create(entity.userPassword, entity.userName, entity.userEmail);
  }
}
