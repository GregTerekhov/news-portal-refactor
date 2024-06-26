import { InputLabel } from 'types';

export function capitalizeFirstLetter(str: string): string | InputLabel {
  if (typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
