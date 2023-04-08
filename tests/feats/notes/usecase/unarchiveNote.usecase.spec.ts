import { NoteRepository } from "../../../../src/app/features/note/repositories/note.repository";
import { DataBaseConnection } from "../../../../src/main/database/typeorm.connection";
import { UnarchiveNoteUseCase } from "../../../../src/app/features/note/usecases/unarchiveNote.usecase";

describe("Unarchive note usecase", () => {
  beforeAll(async () => {
    await DataBaseConnection.connect();
  });

  afterAll(async () => {
    await DataBaseConnection.destroy();
  });

  const makeSut = () => {
    return new UnarchiveNoteUseCase(new NoteRepository());
  };

  test("Deveria existir um retorno", async () => {
    const unarchiveNoteMock = jest.fn();
    jest
      .spyOn(NoteRepository.prototype, "unarchiveNote")
      .mockImplementation(unarchiveNoteMock);
    const sut = makeSut();
    const result = await sut.execute({ noteId: "123123" });

    expect(result).not.toBeNull();
  });
});
