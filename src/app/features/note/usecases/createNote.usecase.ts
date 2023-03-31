import { Note } from "../../../models/note.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { NoteRepository } from "../repositories/note.repository";

export class CreateNoteUseCase {
  constructor(private repository: NoteRepository) {}

  public async execute(data: any) {
    const cacheRepository = new CacheRepository();

    const note = new Note(data.title, data.description, data.userId);

    const result = await this.repository.createNote(note);

    const noteList = (await cacheRepository.get("LIST_NOTE")) ?? [];

    noteList.push(result);

    await cacheRepository.set("LIST_NOTE", noteList);

    return result;
  }
}
