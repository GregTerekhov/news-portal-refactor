import type { EncryptedPassword } from 'types';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

//Функція шифрування користувацького пароля
export async function encryptPassword(password: string): Promise<EncryptedPassword> {
  const encryptionKey: CryptoKey = await generateEncryptionKey();

  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const passwordData: Uint8Array = encoder.encode(password);

  console.log('passwordData', passwordData);

  const encryptedPassword = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: salt,
    },
    encryptionKey,
    passwordData,
  );

  const exportedCryptoKey = await exportEncryptionKey(encryptionKey);

  return { exportedCryptoKey, encryptedPassword, salt };
}

//Функція дешифрування користувацького пароля
export async function decryptPassword(
  exportedKey: ArrayBuffer,
  encryptedPassword: ArrayBuffer,
  salt: Uint8Array,
): Promise<string> {
  if (!exportedKey) {
    throw new Error('Encryption key is missing');
  }

  const encryptionKey = await importEncryptionKey(exportedKey);

  const decryptedPassword = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: salt,
    },
    encryptionKey,
    encryptedPassword,
  );

  return decoder.decode(decryptedPassword);
}

//Функція генерації ключа для шифрування/дешифрування
async function generateEncryptionKey(): Promise<CryptoKey> {
  return window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt'],
  );
}

//Функція експортування ключа для відправки його на бекенд
async function exportEncryptionKey(encryptionKey: CryptoKey): Promise<ArrayBuffer> {
  const exportedKey = await window.crypto.subtle.exportKey('raw', encryptionKey);

  console.log('exportedKey', exportedKey);
  return exportedKey;
}

// Функція імпортування ключа
async function importEncryptionKey(exportedKey: ArrayBuffer): Promise<CryptoKey> {
  const importedKey = await window.crypto.subtle.importKey(
    'raw',
    exportedKey,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  );
  return importedKey;
}
