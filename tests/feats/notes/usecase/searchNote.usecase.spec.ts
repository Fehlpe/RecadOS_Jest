import { NoteRepository } from "../../../../src/app/features/note/repositories/note.repository";
import { SearchNoteUseCase } from "../../../../src/app/features/note/usecases/searchNote.usecase";
import { Note } from "../../../../src/app/models/note.model";
import { NoteEntity } from "../../../../src/app/shared/entities/notes.entity";
import { DataBaseConnection } from "../../../../src/main/database/typeorm.connection";

describe("Search note usecase", () => {
  const noteCreatedAt = new Date("2023-04-04T22:25:59.912Z");
  const noteUpdatedAt = new Date("2023-04-05T01:26:01.220Z");

  const noteEntity: NoteEntity = {
    noteId: "1680647159912",
    noteTitle: "teste1234",
    noteDescription: "teste1234",
    noteArchived: false,
    userId: "1678926436743",
    noteCreatedAt,
    noteUpdatedAt,
  } as NoteEntity;

  beforeAll(async () => {
    await DataBaseConnection.connect();
  });

  afterAll(async () => {
    await DataBaseConnection.destroy();
  });

  const makeSut = () => {
    return new SearchNoteUseCase(new NoteRepository());
  };

  test("Deveria existir um retorno", async () => {
    jest
      .spyOn(NoteRepository.prototype, "getNotes")
      .mockResolvedValueOnce([noteEntity]);
    const sut = makeSut();
    const result = await sut.execute(
      { userId: "123123" },
      { query: "teste1234" }
    );

    expect(result).not.toBeNull();
  });
});
