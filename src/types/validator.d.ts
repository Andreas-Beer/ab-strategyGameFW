type Result =
  | { success: false; value: Error | Error[] }
  | { success: true; value: any };
