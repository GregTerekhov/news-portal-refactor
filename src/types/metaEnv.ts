interface ImportMetaEnv {
  readonly VITE_APP_GOOGLE_API_TOKEN: string;
  readonly VITE_GOOGLE_LOGIN_LINK: string;
  readonly VITE_NEWS_API_KEY: string;
  readonly VITE_WEATHER_API_KEY: string;
  readonly VITE_BASE_URL_DB: string;
  readonly VITE_BASE_URL_NEWS: string;
  readonly VITE_BASE_URL_WEATHER: string;
  readonly VITE_YOUTUBE_ID: string;
  readonly VITE_WEATHER_ICON_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
