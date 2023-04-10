import { DataBaseConnection } from "../../../../src/main/database/typeorm.connection";
import { createServer } from "../../../../src/main/config/server.config";
import request from "supertest";
import { DeleteNoteUseCase } from "../../../../src/app/features/note/usecases/deleteNote.usecase";

describe("Delete Notes route test", () => {
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
    jest.spyOn(DeleteNoteUseCase.prototype, "execute").mockResolvedValueOnce({
      raw: [],
      affected: 1,
    });
    const result = await request(server)
      .delete("/note/user/1679407813112")
      .send({});
    expect(result).toBeDefined();
    expect(result.body.message).toBe("Note deleted");
    expect(result.statusCode).toBe(200);
    expect(result.body).toHaveProperty("ok");
    expect(result.body.ok).toBeTruthy();
  });

  test("Deve retornar status 500 se tiver erro", async () => {
    jest
      .spyOn(DeleteNoteUseCase.prototype, "execute")
      .mockImplementation(() => {
        throw new Error("Erro de Teste");
      });
    const result = await request(server)
      .delete("/note/user/1679407813112")
      .send({});
    expect(result).toBeDefined();
    expect(result.statusCode).toBe(500);
    expect(result.body).toHaveProperty("ok");
    expect(result.body).toHaveProperty("message");
    expect(result.body.ok).toBe(false);
    expect(result.body.message).toEqual(new Error("Erro de Teste").toString());
  });
});
