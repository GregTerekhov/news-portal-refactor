import { z } from 'zod';

const configSchema = z.object({
  APP_GOOGLE_API_TOKEN: z.coerce.string(),
  GOOGLE_LOGIN_LINK: z.coerce.string(),
  NEWS_API_KEY: z.string(),
  WEATHER_API_KEY: z.string(),
  APP_FACEBOOK_APP_ID: z.coerce.string(),
  BASE_URL_DB: z.string(),
  BASE_URL_NEWS: z.string(),
  BASE_URL_WEATHER: z.string(),
  YOUTUBE_ID: z.string(),
  WEATHER_ICON_URL: z.string(),
});

export const parseConfig = (configObj: Record<string, unknown>) => {
  const parseResult = configSchema.safeParse(configObj);

  if (!parseResult.success) throw parseResult.error;

  return parseResult.data;
};
