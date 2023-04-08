import { createServer } from "../../../../src/main/config/server.config";
import request from "supertest";
import { DataBaseConnection } from "../../../../src/main/database/typeorm.connection";
import { RedisConnection } from "../../../../src/main/database/redis.connection";
import { GetUserNotesUseCase } from "../../../../src/app/features/note/usecases/getUserNotes.usecase";
import { NoteEntity } from "../../../../src/app/shared/entities/notes.entity";

describe("Get notes route test", () => {
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
    await RedisConnection.connect();
  });

  afterAll(async () => {
    await RedisConnection.destroy();
    await DataBaseConnection.destroy();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(GetUserNotesUseCase.prototype, "execute")
      .mockResolvedValue([noteEntity]);
  });

  const server = createServer();

  test("Deve retornar status 200 se a listagem for feita com sucesso", async () => {
    const result = await request(server)
      .get("/note/user?userId=1678926436743")
      .send();

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(200);
    expect(result.body).toHaveProperty("ok");
    expect(result.body.ok).toBeTruthy();
    expect(result.body).toHaveProperty("message");
    expect(result.body).toHaveProperty("data");
    expect(result.body.message).toBe("Notes returned");
    expect((result.body.data as any[]).length).toBeGreaterThan(0);
  });

  test("Deve retornar erro 500 se houver uma exceção", async () => {
    jest
      .spyOn(GetUserNotesUseCase.prototype, "execute")
      .mockImplementation(() => {
        throw new Error("Erro de Teste");
      });

    const result = await request(server)
      .get("/note/user?userId=1678926436743")
      .send();
    expect(result).toBeDefined();
    expect(result.statusCode).toBe(500);
    expect(result.body).toHaveProperty("ok");
    expect(result.body).toHaveProperty("message");
    expect(result.body.ok).toBe(false);
    expect(result.body.message).toEqual(new Error("Erro de Teste").toString());
  });
});
