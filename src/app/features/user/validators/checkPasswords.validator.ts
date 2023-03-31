import { NextFunction, Request, Response } from "express";
import { HttpHelper } from "../../../shared/util/http.helper";

export const checkPasswordsValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, password2 } = req.body;

    if (password !== password2)
      return HttpHelper.badRequest(res, "Passwords don't match", 401);

    return next();
  } catch (error: any) {
    return HttpHelper.serverError(res, error.toString());
  }
};
