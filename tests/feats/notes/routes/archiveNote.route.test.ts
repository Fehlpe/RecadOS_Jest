import { DataBaseConnection } from "../../../../src/main/database/typeorm.connection";
import { createServer } from "../../../../src/main/config/server.config";
import request from "supertest";
import { NoteEntity } from "../../../../src/app/shared/entities/notes.entity";
import { ArchiveNoteUseCase } from "../../../../src/app/features/note/usecases/archiveNote.usecase";

describe("Archive Notes route test", () => {
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
    const archiveNoteMock = jest.fn();
    jest
      .spyOn(ArchiveNoteUseCase.prototype, "execute")
      .mockImplementation(archiveNoteMock);
    const result = await request(server)
      .put("/note/1677623494848/1677623503615/archive")
      .send({});
    expect(result).toBeDefined();
    expect(result.body.message).toBe("Note archived");
    expect(result.statusCode).toBe(200);
    expect(result.body).toHaveProperty("ok");
    expect(result.body.ok).toBeTruthy();
  });

  test("Deve retornar status 500 se tiver erro", async () => {
    jest
      .spyOn(ArchiveNoteUseCase.prototype, "execute")
      .mockImplementation(() => {
        throw new Error("Erro de Teste");
      });
    const result = await request(server)
      .put("/note/1677623494848/1677623503615/archive")
      .send({});
    expect(result).toBeDefined();
    expect(result.statusCode).toBe(500);
    expect(result.body).toHaveProperty("ok");
    expect(result.body).toHaveProperty("message");
    expect(result.body.ok).toBe(false);
    expect(result.body.message).toEqual(new Error("Erro de Teste").toString());
  });
});
