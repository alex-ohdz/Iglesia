import type { NextApiResponse } from "next";
import sessionMiddleware from "@backend/lib/session";
import type { SessionRequest } from "@backend/types/session";

export const withSession = (req: SessionRequest, res: NextApiResponse) => {
  return new Promise<void>((resolve, reject) => {
    sessionMiddleware(req as any, res as any, (err: unknown) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
