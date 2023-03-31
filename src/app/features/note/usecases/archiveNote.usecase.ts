import { NoteRepository } from "../repositories/note.repository";

export class ArchiveNoteUseCase {
  constructor(private repository: NoteRepository) {}

  public async execute(data: any) {
    const result = await this.repository.archiveNote(data.noteId.toString());

    return result;
  }
}
