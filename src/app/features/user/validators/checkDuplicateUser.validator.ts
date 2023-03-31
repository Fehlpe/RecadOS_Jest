import { NextFunction, Request, Response } from "express";
import { HttpHelper } from "../../../shared/util/http.helper";
import { UserRepository } from "../repositories/user.repository";
import { FindUserByEmail } from "../usecases/findUserByEmail.usecase";

export const checkDuplicateUserValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const usecase = new FindUserByEmail(new UserRepository());
    const result = await usecase.execute(email);
    if (!result) {
      return next();
    }
    return HttpHelper.badRequest(res, `${email} already registered`, 409);
  } catch (error: any) {
    return HttpHelper.serverError(res, error.toString());
  }
};
