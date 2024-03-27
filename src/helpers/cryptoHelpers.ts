import type { EncryptedPassword } from 'types';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export async function encryptPassword(password: string): Promise<EncryptedPassword> {
  const salt = window.crypto.getRandomValues(new Uint8Array(12));

  const passwordData: Uint8Array = encoder.encode(password);

  const key = await window.crypto.subtle.importKey('raw', salt, { name: 'PBKDF2' }, false, [
    'deriveKey',
  ]);

  const encryptedPassword = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: salt,
    },
    key,
    passwordData,
  );

  return { encryptedPassword, salt };
}

export async function decryptPassword(
  encryptedPassword: ArrayBuffer,
  salt: Uint8Array,
): Promise<string> {
  const key = await window.crypto.subtle.importKey('raw', salt, { name: 'PBKDF2' }, false, [
    'deriveKey',
  ]);

  const decryptedPassword = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: salt,
    },
    key,
    encryptedPassword,
  );

  const password = decoder.decode(decryptedPassword);

  return password;
}
