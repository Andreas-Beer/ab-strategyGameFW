export type ErrorLevel = 'CRITICAL' | 'UNEXPECTED';
export type ErrorType = 'NOT_FOUND' | 'NOT_ENOUGH_RESOURCES';

export interface GameError {
  name: string;
  type: ErrorType;
  level: ErrorLevel;
}
