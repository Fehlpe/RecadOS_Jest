import { NoteRepository } from "../repositories/note.repository";

export class DeleteNoteUseCase {
  constructor(private repository: NoteRepository) {}

  public async execute(data: any) {
    const result = await this.repository.deleteNote(data.noteId.toString());

    return result;
  }
}
