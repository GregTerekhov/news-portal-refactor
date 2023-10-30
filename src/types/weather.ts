export type WeatherData = {
  name: string;
  main: {
    feels_like: number;
    temp: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    main: string;
    icon: string;
    description: string;
  }[];
  timezone: number;
  wind: {
    speed: number;
  };
};
