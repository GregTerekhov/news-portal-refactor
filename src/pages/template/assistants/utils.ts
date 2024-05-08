export function isServerError(error: unknown): boolean {
  console.log('isServerError');
  return typeof error === 'number' && error >= 500;
}
