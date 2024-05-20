export enum OperationType {
  Get = 'get',
  Set = 'set',
  Remove = 'remove',
}

export const localStorageOperation = (
  operation: OperationType,
  key: string,
  value: string | null = null,
): string | null => {
  try {
    if (operation === OperationType.Get) {
      return localStorage.getItem(key);
    } else if (operation === OperationType.Set) {
      if (value !== null) {
        localStorage.setItem(key, value);
        return null;
      } else {
        throw new Error('Value is required for set operation');
      }
    } else if (operation === OperationType.Remove) {
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
  localStorageOperation(OperationType.Remove, 'rememberMe');
  localStorageOperation(OperationType.Remove, 'userId');
};
