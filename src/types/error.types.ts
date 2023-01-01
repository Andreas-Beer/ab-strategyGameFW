export type ErrorLevel = 'CRITICAL' | 'UNEXPECTED' | 'WARNING';
export type ErrorType =
  | 'NOT_FOUND'
  | 'NOT_ENOUGH_RESOURCES'
  | 'NOT_GATE_PASSED';

export interface GameError {
  name: string;
  type: ErrorType;
  level: ErrorLevel;
}
