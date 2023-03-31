import { NoteRepository } from "../repositories/note.repository";

export class UnarchiveNoteUseCase {
  constructor(private repository: NoteRepository) {}

  public async execute(data: any) {
    const result = await this.repository.unarchiveNote(data.noteId.toString());

    return result;
  }
}
