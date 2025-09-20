import type { NextApiRequest } from "next";
import type { Session, SessionData } from "express-session";

export type SessionUser = {
  id: number;
  username: string;
};

export type SessionRequest = NextApiRequest & {
  session: Session & Partial<SessionData> & {
    user?: SessionUser;
  };
};
