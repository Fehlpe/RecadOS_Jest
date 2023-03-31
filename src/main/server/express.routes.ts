import { Express } from "express";
import { noteRoutes } from "../../app/features/note/routes/note.routes";
import { userRoutes } from "../../app/features/user/routes/user.routes";

export const makeRoutes = (app: Express) => {
  app.use("/user", userRoutes);
  app.use("/note", noteRoutes);
};
