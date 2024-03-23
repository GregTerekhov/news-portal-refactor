export interface WeatherData {
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
  sys: {
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibility: number;
  wind: {
    deg: number;
    speed: number;
    gust: number;
  };
}

export interface HourlyWeatherData {
  dt: number;
  dt_text: string;
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
  wind: {
    speed: number;
  };
}

export interface Position {
  lat: number;
  lon: number;
}

export interface WeatherState {
  isLoading: boolean;
  data: WeatherData;
  weatherByHour: HourlyWeatherData | [];
  hasError: string | number | null;
}
