import { CONFIG } from 'config';

export function getRequestUrl(name: string, url: string): string {
  let requestUrl = '';

  switch (true) {
    case name.includes('auth'):
      requestUrl = `${CONFIG.BASE_URL_DB}` + url;
      break;
    case name.includes('apiNews'):
      requestUrl = `${CONFIG.BASE_URL_NEWS}` + url;
      break;
    case name.includes('weather'):
      requestUrl = `${CONFIG.BASE_URL_WEATHER}` + url;
      break;

    default:
      break;
  }

  return requestUrl;
}
