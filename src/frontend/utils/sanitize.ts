const STRIP_SCRIPTS = /<script[^>]*>[\s\S]*?<\/script>/gi;
const STRIP_TAGS = /<[^>]+>/g;
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]+/g;

export const sanitizeTextInput = (value: string): string => {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(STRIP_SCRIPTS, "")
    .replace(STRIP_TAGS, "")
    .replace(/javascript:/gi, "")
    .replace(/data:/gi, "")
    .replace(CONTROL_CHARS, "");
};

export const sanitizeNumericInput = (value: string): string => {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/[^0-9]/g, "");
};

export const sanitizeSelectInput = (
  value: string,
  allowedValues: readonly string[],
  fallback: string
): string => {
  if (allowedValues.includes(value)) {
    return value;
  }
  return allowedValues.includes(fallback) ? fallback : allowedValues[0];
};
