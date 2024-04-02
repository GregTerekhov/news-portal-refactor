import type { EncryptedPassword } from 'types';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

//Функція шифрування користувацького пароля
export async function encryptPassword(password: string): Promise<EncryptedPassword> {
  let encryptionKey: CryptoKey | null = null;

  if (!encryptionKey) {
    encryptionKey = await generateEncryptionKey();
  }

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

  return { encryptionKey, encryptedPassword, salt };
}

//Функція дешифрування користувацького пароля
export async function decryptPassword(
  encryptionKey: CryptoKey,
  encryptedPassword: ArrayBuffer,
  salt: Uint8Array,
): Promise<string> {
  if (!encryptionKey) {
    throw new Error('Encryption key is missing');
  }

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
