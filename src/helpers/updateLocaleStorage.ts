export default function updateLocaleStorage(id: number, key: string, value: boolean): void {
  const dataInStorage: Record<number, boolean> = JSON.parse(localStorage.getItem(key) || '{}');

  if (value === false) {
    delete dataInStorage[id];
  } else {
    dataInStorage[id] = value;
  }

  localStorage.setItem(key, JSON.stringify(dataInStorage));
}
