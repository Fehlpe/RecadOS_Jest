import { NextFunction, Request, Response } from "express";
import { HttpHelper } from "../../../shared/util/http.helper";

export const createUserValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    if (!username)
      return HttpHelper.badRequest(res, "Username not provided", 400);
    if (!email) return HttpHelper.badRequest(res, "Email not provided", 400);
    if (!password)
      return HttpHelper.badRequest(res, "Password not provided", 400);

    return next();
  } catch (error: any) {
    return HttpHelper.serverError(res, error.toString());
  }
};
