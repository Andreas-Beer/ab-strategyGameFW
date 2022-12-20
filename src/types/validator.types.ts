export type Result<S, E extends Error | Error[] = Error> =
  | { success: false; value: E }
  | { success: true; value: S };
