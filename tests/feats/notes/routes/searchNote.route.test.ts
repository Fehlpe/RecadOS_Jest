import { DataBaseConnection } from "../../../../src/main/database/typeorm.connection";
import { createServer } from "../../../../src/main/config/server.config";
import request from "supertest";
import { NoteEntity } from "../../../../src/app/shared/entities/notes.entity";
import { SearchNoteUseCase } from "../../../../src/app/features/note/usecases/searchNote.usecase";
import { GetUserNotesUseCase } from "../../../../src/app/features/note/usecases/getUserNotes.usecase";

describe("Search Notes route test", () => {
  const noteCreatedAt = new Date("2023-04-04T22:25:59.912Z");
  const noteUpdatedAt = new Date("2023-04-05T01:26:01.220Z");

  const note: NoteEntity = {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const server = createServer();

  test("Deve retornar status 200 se receber as notas", async () => {
    jest
      .spyOn(SearchNoteUseCase.prototype, "execute")
      .mockResolvedValue([note]);
    const result = await request(server)
      .get("/note/1677623494848/search?query=a")
      .send({});
    expect(result).toBeDefined();
    expect(result.body.message).toBe("Note searched");
    expect(result.statusCode).toBe(200);
    expect(result.body).toHaveProperty("ok");
    expect(result.body.ok).toBeTruthy();
  });

  test("Deve retornar status 500 se tiver erro", async () => {
    jest
      .spyOn(SearchNoteUseCase.prototype, "execute")
      .mockImplementation(() => {
        throw new Error("Erro de Teste");
      });
    const result = await request(server)
      .get("/note/1677623494848/search?query=a")
      .send({});
    expect(result).toBeDefined();
    expect(result.statusCode).toBe(500);
    expect(result.body).toHaveProperty("ok");
    expect(result.body).toHaveProperty("message");
    expect(result.body.ok).toBe(false);
    expect(result.body.message).toEqual(new Error("Erro de Teste").toString());
  });
});
