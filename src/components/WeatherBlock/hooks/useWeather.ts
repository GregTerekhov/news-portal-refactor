import { useEffect, useState } from 'react';

import { useWeatherAPIRedux } from 'reduxStore/hooks';

import { localStorageOperation, OperationType } from 'helpers';

enum StatePermission {
  Granted = 'granted',
  Prompt = 'prompt',
  Denied = 'denied',
}

enum WeatherButtonText {
  GivePermission = 'Give permission for your geolocation',
  GetWeather = 'Get the weather for your region',
  Denied = 'Permission denied',
}

enum ErrorConsoleText {
  Denied = 'User denied access to geolocation',
  Unavailable = 'Geolocation information is unavailable',
  Timeout = 'Geolocation access request timed out',
  Unknown = 'An unknown error occurred while getting geolocation',
}

type ErrorCallback = (error: GeolocationPositionError) => void;

const useWeather = () => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [statePermission, setStatePermission] = useState<StatePermission | null>(null);
  const [hasGeolocationPermission, setHasGeolocationPermission] = useState(false);

  const { getCurrentWeather, getHourlyWeather } = useWeatherAPIRedux();

  const geolocation: boolean = 'geolocation' in navigator;

  const hasVisitedBefore = localStorageOperation(OperationType.Get, 'geolocationPermission');

  useEffect(() => {
    if (hasVisitedBefore) {
      setHasGeolocationPermission(true);
      setStatePermission(StatePermission.Granted);
    }
  }, [statePermission]);

  const geolocationError: ErrorCallback = (error) => {
    setHasGeolocationPermission(false);
    setStatePermission(StatePermission.Denied);

    if (hasVisitedBefore) {
      localStorageOperation(OperationType.Remove, 'geolocationPermission');
    }

    switch (error.code) {
      case error.PERMISSION_DENIED:
        // Користувач відмовив у наданні доступу до геолокації
        console.error(ErrorConsoleText.Denied);
        break;
      case error.POSITION_UNAVAILABLE:
        // Інформація про геолокацію недоступна
        console.error(ErrorConsoleText.Unavailable);
        break;
      case error.TIMEOUT:
        // Запит на доступ до геолокації завершився таймаутом
        console.error(ErrorConsoleText.Timeout);
        break;
      default:
        console.error(ErrorConsoleText.Unknown);
        break;
    }
  };

  const requestGeolocationPermission = (): void => {
    if (geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === StatePermission.Granted) {
          setStatePermission(StatePermission.Granted);
          setHasGeolocationPermission(true);

          localStorageOperation(
            OperationType.Set,
            'geolocationPermission',
            StatePermission.Granted,
          );

          navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;

            const sendGeolocation = {
              lat: latitude,
              lon: longitude,
            };

            getCurrentWeather(sendGeolocation);
            getHourlyWeather(sendGeolocation);
          });
        } else if (result.state === StatePermission.Prompt) {
          setStatePermission(StatePermission.Prompt);

          navigator.geolocation.getCurrentPosition(({ coords }) => {
            setHasGeolocationPermission(true);

            localStorageOperation(
              OperationType.Set,
              'geolocationPermission',
              StatePermission.Granted,
            );

            const { latitude, longitude } = coords;

            const sendGeolocation = {
              lat: latitude,
              lon: longitude,
            };

            getCurrentWeather(sendGeolocation);
            getHourlyWeather(sendGeolocation);
          }, geolocationError);
        } else {
          setHasGeolocationPermission(false);
          setStatePermission(StatePermission.Denied);

          localStorageOperation(OperationType.Remove, 'geolocationPermission');
        }
      });
    }
  };

  const toggleTemperatureScale = () => {
    setIsCelsius(!isCelsius);
  };

  const flipWeatherDetails = () => {
    setIsFlipped(!isFlipped);
  };

  //Виведення тексту в кнопці виклику погоди
  const showButtonText = (): WeatherButtonText => {
    switch (true) {
      case statePermission === StatePermission.Prompt || !hasGeolocationPermission:
        return WeatherButtonText.GivePermission;
      case hasGeolocationPermission:
        return WeatherButtonText.GetWeather;
      case statePermission === StatePermission.Denied:
        return WeatherButtonText.Denied;

      default:
        return WeatherButtonText.GivePermission;
    }
  };

  const flippingCard = isFlipped ? 'rotate-y-180' : 'rotate-y-0';

  return {
    isCelsius,
    flippingCard,
    statePermission,
    hasGeolocationPermission,
    requestGeolocationPermission,
    toggleTemperatureScale,
    flipWeatherDetails,
    showButtonText,
  };
};

export default useWeather;
