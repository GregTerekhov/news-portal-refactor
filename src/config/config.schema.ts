import { z } from 'zod';

const configSchema = z.object({
  APP_GOOGLE_API_TOKEN: z.coerce.string(),
  NEWS_API_KEY: z.string(),
  WEATHER_API_KEY: z.string(),
});

export const parseConfig = (configObj: Record<string, unknown>) => {
  const parseResult = configSchema.safeParse(configObj);

  if (!parseResult.success) throw parseResult.error;

  return parseResult.data;
};
