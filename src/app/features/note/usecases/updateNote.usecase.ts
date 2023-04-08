import { NoteRepository } from "../repositories/note.repository";

export class UpdateNoteUseCase {
  constructor(private repository: NoteRepository) {}

  public async execute(dataBody: any, dataParams: any) {
    const note = {
      noteTitle: dataBody.noteTitle,
      noteDescription: dataBody.noteDescription,
    };
    const noteId = dataParams.noteId.toString();

    const result = await this.repository.updateNote(note, noteId);

    return result;
  }
}
