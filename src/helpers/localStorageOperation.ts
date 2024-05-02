export type LocalStorageOperation = 'get' | 'set' | 'remove';

export const localStorageOperation = (
  operation: LocalStorageOperation,
  key: string,
  value: string | null = null,
): string | null => {
  try {
    if (operation === 'get') {
      return localStorage.getItem(key);
    } else if (operation === 'set') {
      if (value !== null) {
        localStorage.setItem(key, value);
        return null;
      } else {
        throw new Error('Value is required for set operation');
      }
    } else if (operation === 'remove') {
      localStorage.removeItem(key);
      return null;
    } else {
      throw new Error('Invalid operation type');
    }
  } catch (error) {
    console.error('Error while performing localStorage operation: ', error);
    throw error;
  }
};

export const handleRemoveFromLocalStorage = () => {
  localStorageOperation('remove', 'rememberMe');
  localStorageOperation('remove', 'userId');
};
