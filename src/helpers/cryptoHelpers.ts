import type { EncryptedPassword } from 'types';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

//Функція шифрування користувацького пароля
export async function encryptPassword(password: string): Promise<EncryptedPassword> {
  const encryptionKey: CryptoKey = await generateEncryptionKey();

  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const passwordData: Uint8Array = encoder.encode(password);

  const encryptedPassword = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: salt,
    },
    encryptionKey,
    passwordData,
  );

  const exportedCryptoKey = await exportEncryptionKey(encryptionKey);

  const base64EncryptedPassword = arrayBufferToBase64String(encryptedPassword);
  const base64ExportedCryptoKey = arrayBufferToBase64String(exportedCryptoKey);
  const base64Salt = arrayBufferToBase64String(salt);

  return {
    exportedCryptoKey: base64ExportedCryptoKey,
    encryptedPassword: base64EncryptedPassword,
    salt: base64Salt,
  };
}

//Функція дешифрування користувацького пароля
export async function decryptPassword(
  base64ExportedKey: string,
  base64EncryptedPassword: string,
  base64Salt: string,
): Promise<string> {
  if (!base64ExportedKey) {
    throw new Error('Encryption key is missing');
  }

  const exportedKey = base64StringToArrayBuffer(base64ExportedKey);
  const encryptedPassword = base64StringToArrayBuffer(base64EncryptedPassword);
  const salt = base64StringToArrayBuffer(base64Salt);

  const decryptionKey = await importEncryptionKey(exportedKey);

  const decryptedPassword = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: salt,
    },
    decryptionKey,
    encryptedPassword,
  );

  return decoder.decode(decryptedPassword);
}

// Допоміжна функція для перетворення масиву байтів в base64 строку
function arrayBufferToBase64String(buffer: ArrayBuffer | Uint8Array): string {
  if (buffer instanceof Uint8Array) {
    buffer = buffer.buffer;
  }

  const bytes = new Uint8Array(buffer);
  const binary = Array.from(bytes)
    .map((byte) => String.fromCharCode(byte))
    .join('');

  return btoa(binary);
}

// Допоміжна функція для зворотнього перетворення base64 строки в ArrayBuffer чи Uint8Array
function base64StringToArrayBuffer(base64String: string): ArrayBuffer | Uint8Array {
  const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);

  for (let index = 0; index < binaryString.length; index += 1) {
    bytes[index] = binaryString.charCodeAt(index);
  }

  if (base64String.endsWith('==')) {
    return bytes;
  } else {
    return bytes.buffer;
  }
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
  return await window.crypto.subtle.exportKey('raw', encryptionKey);
}

// Функція імпортування ключа
async function importEncryptionKey(exportedKey: ArrayBuffer): Promise<CryptoKey> {
  return await window.crypto.subtle.importKey(
    'raw',
    exportedKey,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  );
}
