import { Note } from "../../../models/note.model";
import { NoteRepository } from "../repositories/note.repository";

export class CreateNoteUseCase {
  constructor(private repository: NoteRepository) {}

  public async execute(data: any) {
    const note = new Note(data.title, data.description, data.userId);

    const result = await this.repository.createNote(note);

    return result;
  }
}
