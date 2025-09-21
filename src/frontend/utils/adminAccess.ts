import {
  ADMIN_ACCESS_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE,
  ADMIN_TEMPORARY_ACCESS_MAX_AGE,
} from "../../shared/constants/admin";

type AccessType = "session" | "temporary";

const setAdminAccessCookie = (type: AccessType, maxAge: number) => {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${ADMIN_ACCESS_COOKIE_NAME}=${type}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
};

export const grantAdminSessionAccess = () => {
  setAdminAccessCookie("session", ADMIN_SESSION_MAX_AGE);
};

export const grantAdminTemporaryAccess = () => {
  setAdminAccessCookie("temporary", ADMIN_TEMPORARY_ACCESS_MAX_AGE);
};

export const revokeAdminAccess = () => {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${ADMIN_ACCESS_COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax`;
};

export const hasAdminAccess = () => {
  if (typeof document === "undefined") {
    return false;
  }

  return document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .some((cookie) => cookie.startsWith(`${ADMIN_ACCESS_COOKIE_NAME}=`));
};
