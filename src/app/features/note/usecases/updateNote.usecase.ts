import { EventEmitter } from "events";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { NoteRepository } from "../repositories/note.repository";

export class UpdateNoteUseCase {
  private cacheRepository: CacheRepository;
  private eventEmitter: EventEmitter;

  constructor(private repository: NoteRepository) {
    this.cacheRepository = new CacheRepository();
    this.eventEmitter = new EventEmitter();

    this.eventEmitter.on("noteUpdated", async (note: any) => {
      const noteList = (await this.cacheRepository.get("LIST_NOTE")) ?? [];

      const updatedNoteList = noteList.map((n: any) => {
        if (n.noteId === note.noteId) {
          return {
            ...n,
            noteTitle: note.noteTitle,
            noteDescription: note.noteDescription,
          };
        }
        return n;
      });

      await this.cacheRepository.set("LIST_NOTE", updatedNoteList);
    });
  }

  public async execute(dataBody: any, dataParams: any) {
    const note = {
      noteTitle: dataBody.noteTitle,
      noteDescription: dataBody.noteDescription,
    };
    const noteId = dataParams.noteId.toString();

    const result = await this.repository.updateNote(note, noteId);

    this.eventEmitter.emit("noteUpdated", { noteId, ...note });

    return result;
  }
}
