import { HttpHelper } from "../../../shared/util/http.helper";
import { Request, response, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { CreateUserUseCase } from "../usecases/createUser.usecase";
import { LoginUserUsecase } from "../usecases/loginUser.usecase";

export class UserController {
  public async create(req: Request, res: Response) {
    try {
      const usecase = new CreateUserUseCase(new UserRepository());
      const result = await usecase.execute(req.body);
      return HttpHelper.sucess(res, result, "User created");
    } catch (error: any) {
      return HttpHelper.serverError(res, error.toString());
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const usecase = new LoginUserUsecase(new UserRepository());
      const result = await usecase.execute(req.body);
      if (!result) {
        return HttpHelper.badRequest(res, "Incorrect email or password!", 404);
      }
      return HttpHelper.sucess(res, result, "logged", 201);
    } catch (error: any) {
      return HttpHelper.serverError(res, error.toString());
    }
  }
}
