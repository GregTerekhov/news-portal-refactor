export default function updateLocaleStorage(newsUrl: string, key: string, value: boolean): void {
  const dataInStorage: Record<string, boolean> = JSON.parse(localStorage.getItem(key) || '{}');

  if (value === false) {
    delete dataInStorage[newsUrl];
  } else {
    dataInStorage[newsUrl] = value;
  }

  localStorage.setItem(key, JSON.stringify(dataInStorage));
}
