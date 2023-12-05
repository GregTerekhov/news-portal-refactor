interface ImportMetaEnv {
  readonly VITE_APP_GOOGLE_API_TOKEN: string;
  readonly VITE_NEWS_API_KEY: string;
  readonly VITE_WEATHER_API_KEY: string;
  readonly VITE_APP_FACEBOOK_APP_ID: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
