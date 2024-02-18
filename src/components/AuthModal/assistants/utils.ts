import type { AuthRequestWithoutName } from 'types';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

// Функція шифрування пароля для запису в localStorage, якщо чекбокс RememberMe isChecked
async function encryptData(userData: Record<string, string>, key: CryptoKey): Promise<string> {
  try {
    const userDataString = JSON.stringify(userData);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    // console.log('iv-encoded', iv);
    const encryptedData = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoder.encode(userDataString),
    );

    const encryptedArray = new Uint8Array(encryptedData);

    // console.log('encryptedData', encryptedData);
    let combined = new Uint8Array(iv.length + encryptedArray.byteLength);

    combined.set(iv);
    combined.set(encryptedArray, iv.length);

    const base64String = btoa(
      new Uint8Array(combined).reduce((data, byte) => data + String.fromCharCode(byte), ''),
    );
    // console.log('base64String', base64String);

    return base64String;
  } catch (error) {
    console.error('Error during encryption:', error);
    throw error;
  }
}

// Функція розшифрування
async function decryptData(encryptedData: string, key: CryptoKey): Promise<Record<string, string>> {
  try {
    const decodedData = atob(encryptedData);
    const uint8Array = encoder.encode(decodedData);
    const iv = uint8Array.slice(0, 12);
    const encryptedBytes = uint8Array.slice(12);

    console.log('iv-decoded', iv);
    console.log('encryptedBytes', encryptedBytes);

    const decryptedDataBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
      window.crypto.subtle
        .decrypt({ name: 'AES-GCM', iv }, key, encryptedBytes.buffer)
        .then(resolve)
        .catch((error) => reject({ decryptError: error }));
    });

    const decryptedDataString = decoder.decode(new Uint8Array(decryptedDataBuffer));

    const userData = JSON.parse(decryptedDataString);

    return userData;
  } catch (error) {
    console.log('Error decrypting data:', error);
    throw error;
  }
}

// Генерація шифрувального ключа

async function generateEncryptionKey(): Promise<CryptoKey> {
  const generatedKey = await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt'],
  );

  // console.log('generatedKey', generatedKey);

  // Конвертування CryptoKey у JSON-serializable формат (JWK)
  const keyAsJson = await crypto.subtle.exportKey('jwk', generatedKey);
  const keyAsString = JSON.stringify(keyAsJson);

  // console.log('keyAsString', keyAsString);

  localStorage.setItem('encryptionKey', keyAsString);

  return generatedKey;
}

// Функція імпортування ключа шифрування з формату рядка
async function importStoredKey(keyString: string): Promise<CryptoKey | null> {
  try {
    const rawKey = JSON.parse(keyString);
    // console.log('rawKey', rawKey);
    const key = await crypto.subtle.importKey(
      'jwk',
      rawKey,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt'],
    );
    // console.log('key', key);
    return key;
  } catch (error) {
    console.error('Error importing key from string:', error);
    return null;
  }
}

// Функція для збереження даних у localStorage
export const saveUserDataToLocalStorage = async (
  userData: AuthRequestWithoutName,
): Promise<void> => {
  try {
    const encryptionKey = await generateEncryptionKey();
    const encryptedData = await encryptData(userData, encryptionKey);

    // Конвертування CryptoKey у JSON-serializable формат (JWK)
    const keyAsJson = await crypto.subtle.exportKey('jwk', encryptionKey);
    const keyAsString = JSON.stringify(keyAsJson);

    // Збереження обох зашифрованих даних та ключа
    localStorage.setItem('rememberMeData', encryptedData);
    localStorage.setItem('encryptionKey', keyAsString);
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

// Функція отримання даних з localStorage для дешифрування
export const loadUserDataFromLocalStorage = async (): Promise<Record<string, string> | null> => {
  try {
    const encryptedData = localStorage.getItem('rememberMeData');
    const savedEncryptionKey = localStorage.getItem('encryptionKey');

    if (encryptedData && savedEncryptionKey) {
      const encryptionKey = await importStoredKey(savedEncryptionKey);

      if (encryptionKey) {
        const userData = await decryptData(encryptedData, encryptionKey);
        return userData;
      } else {
        console.error('Failed to import encryption key');
        return null;
      }
    }

    return null;
  } catch (error) {
    console.error('Error loading data from localStorage: ', error);
    return null;
  }
};

export const getCheckboxState = () => {
  const rememberMe = localStorage.getItem('rememberMe');
  return rememberMe ? rememberMe === 'true' : false;
};
