export function isServerError(error: unknown): boolean {
  return typeof error === 'number' && error >= 500;
}
