/** Pattern to validate an email. */
export const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,7}$/;

/** Pattern to validate a password. */
export const passwordPattern =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,}$/;