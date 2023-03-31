import { NextFunction, Request, Response } from "express";
import { HttpHelper } from "../../../shared/util/http.helper";

export const loginUserValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email) return HttpHelper.badRequest(res, "Email not provided", 404);
    if (!password)
      return HttpHelper.badRequest(res, "Password not provided", 404);

    return next();
  } catch (error: any) {
    return HttpHelper.serverError(res, error.toString());
  }
};
