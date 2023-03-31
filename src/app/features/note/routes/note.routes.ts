import { Router } from "express";
import { NoteController } from "../controllers/note.controller";

const noteRoutes = Router();

noteRoutes.post("/", new NoteController().create);
noteRoutes.get("/user", new NoteController().getUserNotes);
noteRoutes.put("/user/:noteId", new NoteController().updateNote);
noteRoutes.delete("/user/:noteId", new NoteController().deleteNote);
noteRoutes.put("/:userId/:noteId/archive", new NoteController().archiveNote);
noteRoutes.put(
  "/:userId/:noteId/unarchive",
  new NoteController().unarchiveNote
);
noteRoutes.get("/:userId/search", new NoteController().searchNote);

export { noteRoutes };
