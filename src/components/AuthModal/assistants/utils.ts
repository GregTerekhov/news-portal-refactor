// Функція шифрування пароля для запису в localStorage, якщо чекбокс RememberMe isChecked

export async function encryptData(
  userData: Record<string, string>,
  key: CryptoKey,
): Promise<string> {
  try {
    const userDataString = JSON.stringify(userData);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      new TextEncoder().encode(userDataString),
    );
    const combined = new Uint8Array(iv.length + encryptedData.byteLength);

    combined.set(iv);
    combined.set(new Uint8Array(encryptedData), iv.length);

    const base64String = btoa(String.fromCharCode.apply(null, Array.from(combined)));

    return base64String;
  } catch (error) {
    console.error('Error during encryption:', error);
    throw error;
  }
}

// Функція розшифрування
export async function decryptData(
  encryptedData: string,
  key: CryptoKey,
): Promise<Record<string, string>> {
  try {
    const decodedData = atob(encryptedData);
    const uint8Array = new TextEncoder().encode(decodedData);
    const iv = uint8Array.slice(0, 12);
    const encryptedBytes = uint8Array.slice(12);

    const decryptedDataBuffer = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encryptedBytes.buffer,
    );

    const decryptedDataString = new TextDecoder().decode(new Uint8Array(decryptedDataBuffer));
    const userData = JSON.parse(decryptedDataString);

    return userData;
  } catch (error) {
    console.error('Error decrypting data:', error);
    throw error;
  }
}

// Генерація шифрувального ключа

export async function generateEncryptionKey(): Promise<CryptoKey> {
  const generatedKey = await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt'],
  );

  return generatedKey;
}
