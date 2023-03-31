import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { NoteRepository } from "../repositories/note.repository";

export class GetUserNotesUseCase {
  constructor(private repository: NoteRepository) {}

  public async execute(data: any) {
    const cacheRepository = new CacheRepository();

    cacheRepository.del("LIST_USER_NOTE");

    const userId = data.userId.toString();

    const result = await this.repository.getNotes(userId);

    const noteList = (await cacheRepository.get("LIST_USER_NOTE")) ?? [];

    result.map((r) => noteList.push(r));

    await cacheRepository.set("LIST_USER_NOTE", noteList);

    return result;
  }
}
