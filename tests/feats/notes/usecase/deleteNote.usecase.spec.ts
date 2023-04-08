import { NoteRepository } from "../../../../src/app/features/note/repositories/note.repository";
import { NoteEntity } from "../../../../src/app/shared/entities/notes.entity";
import { DataBaseConnection } from "../../../../src/main/database/typeorm.connection";
import { DeleteNoteUseCase } from "../../../../src/app/features/note/usecases/deleteNote.usecase";

describe("Delete note usecase", () => {
  beforeAll(async () => {
    await DataBaseConnection.connect();
  });

  afterAll(async () => {
    await DataBaseConnection.destroy();
  });

  const makeSut = () => {
    return new DeleteNoteUseCase(new NoteRepository());
  };

  test("Deveria existir um retorno", async () => {
    jest.spyOn(NoteRepository.prototype, "deleteNote").mockResolvedValueOnce({
      raw: [],
      affected: 1,
    });
    const sut = makeSut();
    const result = await sut.execute({ noteId: "123123" });

    expect(result).not.toBeNull();
  });
});
