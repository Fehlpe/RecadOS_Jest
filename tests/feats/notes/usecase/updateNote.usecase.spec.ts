import { NoteRepository } from "../../../../src/app/features/note/repositories/note.repository";
import { CreateNoteUseCase } from "../../../../src/app/features/note/usecases/createNote.usecase";
import { UserRepository } from "../../../../src/app/features/user/repositories/user.repository";
import { CreateUserUseCase } from "../../../../src/app/features/user/usecases/createUser.usecase";
import { Note } from "../../../../src/app/models/note.model";
import { User } from "../../../../src/app/models/user.model";
import { NoteEntity } from "../../../../src/app/shared/entities/notes.entity";
import { DataBaseConnection } from "../../../../src/main/database/typeorm.connection";
import { UpdateNoteUseCase } from "../../../../src/app/features/note/usecases/updateNote.usecase";

describe("Update note usecase", () => {
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
    return new UpdateNoteUseCase(new NoteRepository());
  };

  test("Deveria existir um retorno", async () => {
    jest
      .spyOn(NoteRepository.prototype, "updateNote")
      .mockResolvedValueOnce(noteEntity);
    const sut = makeSut();
    const result = await sut.execute(
      { noteTitle: "titulo", noteDescription: "descricao" },
      { noteId: "123123" }
    );

    expect(result).not.toBeNull();
  });
});
