import { NoteRepository } from "../../../../src/app/features/note/repositories/note.repository";
import { DataBaseConnection } from "../../../../src/main/database/typeorm.connection";
import { ArchiveNoteUseCase } from "../../../../src/app/features/note/usecases/archiveNote.usecase";

describe("Archive note usecase", () => {
  beforeAll(async () => {
    await DataBaseConnection.connect();
  });

  afterAll(async () => {
    await DataBaseConnection.destroy();
  });

  const makeSut = () => {
    return new ArchiveNoteUseCase(new NoteRepository());
  };

  test("Deveria existir um retorno", async () => {
    const archiveNoteMock = jest.fn();
    jest
      .spyOn(NoteRepository.prototype, "archiveNote")
      .mockImplementation(archiveNoteMock);
    const sut = makeSut();
    const result = await sut.execute({ noteId: "123123" });

    expect(result).not.toBeNull();
  });
});
