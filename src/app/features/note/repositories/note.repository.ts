import { ILike } from "typeorm";
import { DataBaseConnection } from "../../../../main/database/typeorm.connection";
import { Note } from "../../../models/note.model";
import { NoteEntity } from "../../../shared/entities/notes.entity";

export class NoteRepository {
  private _repository = DataBaseConnection.connection.getRepository(NoteEntity);

  public async createNote(note: Note) {
    const noteEntity = this._repository.create({
      noteTitle: note.title,
      noteDescription: note.description,
      userId: note.userId,
    });
    const result = await this._repository.save(noteEntity);

    return result;
  }

  public async getNotes(userId: string) {
    const result = await this._repository.find({ where: { userId: userId } });
    return result;
  }

  public async updateNote(note: any, noteId: string) {
    const oldNote = await this._repository.findOneBy({
      noteId,
    });

    if (!oldNote) {
      return undefined;
    }

    oldNote.noteTitle = note.noteTitle;
    oldNote.noteDescription = note.noteDescription;

    return await this._repository.save(oldNote);
  }

  public async deleteNote(noteId: string) {
    return await this._repository.delete({
      noteId,
    });
  }

  public async archiveNote(noteId: string) {
    const oldNote = await this._repository.findOneBy({
      noteId,
    });

    if (!oldNote) {
      return undefined;
    }

    oldNote.noteArchived = true;

    await this._repository.save(oldNote);
  }

  public async unarchiveNote(noteId: string) {
    const oldNote = await this._repository.findOneBy({
      noteId,
    });

    if (!oldNote) {
      return undefined;
    }

    oldNote.noteArchived = false;

    await this._repository.save(oldNote);
  }

  public async searchNote(userId: string, query: string) {
    const where = query
      ? { userId, noteTitle: ILike(`%${query}%`) }
      : { userId };
    return await this._repository.find({ where });
  }

  private mapEntityToModel(entity: NoteEntity) {
    return Note.create(entity.noteTitle, entity.noteDescription, entity.userId);
  }
}
