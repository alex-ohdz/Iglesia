import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "@backend/lib/db";

export type ActivityRow = RowDataPacket & {
  id: number;
  date: string;
  title: string;
  body: string;
  image: string | null;
};

export type ActivityInput = {
  date: string;
  title: string;
  body: string;
  imageBase64: string;
};

export const listActivities = async () => {
  const result = await query<ActivityRow[]>(
    "SELECT id, date, title, body, image FROM recent_activity ORDER BY id DESC"
  );
  return result.rows;
};

export const createActivity = async ({
  date,
  title,
  body,
  imageBase64,
}: ActivityInput) => {
  const insertResult = await query<ResultSetHeader>(
    "INSERT INTO recent_activity (date, title, body, image) VALUES (?, ?, ?, ?)",
    [date, title, body, imageBase64]
  );

  return findActivityById(insertResult.rows.insertId);
};

export const updateActivityRecord = async (
  id: number,
  updates: Partial<Omit<ActivityInput, "imageBase64">> & { imageBase64?: string }
) => {
  const fields: string[] = [];
  const values: (string | number)[] = [];

  if (updates.date !== undefined) {
    fields.push("date = ?");
    values.push(updates.date);
  }

  if (updates.title !== undefined) {
    fields.push("title = ?");
    values.push(updates.title);
  }

  if (updates.body !== undefined) {
    fields.push("body = ?");
    values.push(updates.body);
  }

  if (updates.imageBase64 !== undefined) {
    fields.push("image = ?");
    values.push(updates.imageBase64);
  }

  if (fields.length === 0) {
    return findActivityById(id);
  }

  values.push(id);

  await query<ResultSetHeader>(
    `UPDATE recent_activity SET ${fields.join(", ")} WHERE id = ?`,
    values
  );

  return findActivityById(id);
};

export const removeActivity = async (id: number) => {
  const existing = await findActivityById(id);

  if (!existing) {
    return null;
  }

  await query<ResultSetHeader>(
    "DELETE FROM recent_activity WHERE id = ?",
    [id]
  );

  return existing;
};

const findActivityById = async (id: number) => {
  const result = await query<ActivityRow[]>(
    "SELECT id, date, title, body, image FROM recent_activity WHERE id = ?",
    [id]
  );

  return result.rows[0] ?? null;
};
