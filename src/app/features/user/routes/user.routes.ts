import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { checkDuplicateUserValidator } from "../validators/checkDuplicateUser.validator";
import { checkPasswordsValidator } from "../validators/checkPasswords.validator";
import { createUserValidator } from "../validators/createUser.validator";
import { loginUserValidator } from "../validators/loginUser.validator";

const userRoutes = Router();

userRoutes.post(
  "/",
  [createUserValidator, checkDuplicateUserValidator, checkPasswordsValidator],
  new UserController().create
);
userRoutes.post("/login", [loginUserValidator], new UserController().login);

export { userRoutes };
