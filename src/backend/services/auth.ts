import bcrypt from "bcryptjs";
import type { RowDataPacket } from "mysql2";
import { query } from "@backend/lib/db";
import type { SessionRequest, SessionUser } from "@backend/types/session";

export type UserRow = RowDataPacket & {
  id: number;
  username: string;
  password: string;
};

export const findUserByUsername = async (username: string) => {
  const result = await query<UserRow[]>(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  return result.rows[0] ?? null;
};

export const verifyCredentials = async (
  username: string,
  password: string
): Promise<SessionUser | null> => {
  const user = await findUserByUsername(username);

  if (!user || !user.password) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return null;
  }

  return { id: user.id, username: user.username };
};

export const persistUserSession = async (
  req: SessionRequest,
  user: SessionUser
) => {
  req.session.user = user;

  await new Promise<void>((resolve, reject) => {
    req.session.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const clearUserSession = async (req: SessionRequest) => {
  if (req.session) {
    delete req.session.user;

    await new Promise<void>((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
};
