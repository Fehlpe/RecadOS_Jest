import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { NoteRepository } from "../repositories/note.repository";

export class GetUserNotesUseCase {
  constructor(private repository: NoteRepository) {}

  public async execute(data: any) {
    const userId = data.userId.toString();

    const result = await this.repository.getNotes(userId);

    return result;
  }
}
