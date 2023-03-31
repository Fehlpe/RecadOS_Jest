import { NoteRepository } from "../repositories/note.repository";

export class SearchNoteUseCase {
  constructor(private repository: NoteRepository) {}

  public async execute(dataParams: any, dataQuery: any) {
    const userId = dataParams.userId.toString();
    const query = dataQuery.query.toString();

    const result = await this.repository.searchNote(userId, query);

    return result;
  }
}
