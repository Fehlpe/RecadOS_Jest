import { NoteRepository } from "../repositories/note.repository";
import { EventEmitter } from "events";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";

export class DeleteNoteUseCase {
  private cacheRepository: CacheRepository;
  private eventEmitter: EventEmitter;

  constructor(private repository: NoteRepository) {
    this.cacheRepository = new CacheRepository();
    this.eventEmitter = new EventEmitter();

    this.eventEmitter.on("noteDeleted", async (noteId: string) => {
      const noteList = (await this.cacheRepository.get("LIST_NOTE")) ?? [];

      const updatedNoteList = noteList.filter(
        (note: any) => note.noteId !== noteId
      );

      await this.cacheRepository.set("LIST_NOTE", updatedNoteList);
    });
  }

  public async execute(data: any) {
    const result = await this.repository.deleteNote(data.noteId.toString());

    this.eventEmitter.emit("noteDeleted", data.noteId.toString());

    return result;
  }
}
