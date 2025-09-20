import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "@backend/lib/db";

export type WorkerRow = RowDataPacket & {
  id: number;
  name: string;
  rol: string;
  image: string | null;
  created_at?: string;
};

export type WorkerInput = {
  name: string;
  rol: string;
  imageBase64: string;
};

export const listWorkers = async () => {
  const result = await query<WorkerRow[]>(
    "SELECT id, name, rol, image, created_at FROM workers ORDER BY id DESC"
  );
  return result.rows;
};

export const createWorker = async ({
  name,
  rol,
  imageBase64,
}: WorkerInput) => {
  const insertResult = await query<ResultSetHeader>(
    "INSERT INTO workers (name, rol, image) VALUES (?, ?, ?)",
    [name, rol, imageBase64]
  );

  const insertedId = insertResult.rows.insertId;
  const worker = await findWorkerById(insertedId);
  return worker;
};

export const updateWorkerRecord = async (
  id: number,
  updates: Partial<Omit<WorkerInput, "imageBase64">> & { imageBase64?: string }
) => {
  const fields: string[] = [];
  const values: (string | number)[] = [];

  if (updates.name !== undefined) {
    fields.push("name = ?");
    values.push(updates.name);
  }

  if (updates.rol !== undefined) {
    fields.push("rol = ?");
    values.push(updates.rol);
  }

  if (updates.imageBase64 !== undefined) {
    fields.push("image = ?");
    values.push(updates.imageBase64);
  }

  if (fields.length === 0) {
    return findWorkerById(id);
  }

  values.push(id);

  await query<ResultSetHeader>(
    `UPDATE workers SET ${fields.join(", ")} WHERE id = ?`,
    values
  );

  return findWorkerById(id);
};

export const removeWorker = async (id: number) => {
  const existing = await findWorkerById(id);

  if (!existing) {
    return null;
  }

  await query<ResultSetHeader>("DELETE FROM workers WHERE id = ?", [id]);
  return existing;
};

const findWorkerById = async (id: number) => {
  const result = await query<WorkerRow[]>(
    "SELECT id, name, rol, image, created_at FROM workers WHERE id = ?",
    [id]
  );

  return result.rows[0] ?? null;
};
