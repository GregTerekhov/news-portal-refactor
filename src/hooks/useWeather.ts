import { useEffect, useState } from 'react';

import useWeatherCollector from './useWeatherCollector';

const useWeather = () => {
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [hasGeolocationPermission, setHasGeolocationPermission] = useState<boolean>(false);

  const { getCurrentWeather, getHourlyWeather } = useWeatherCollector();

  const geolocation: boolean = 'geolocation' in navigator;

  useEffect(() => {
    if (geolocation) {
      const hasVisitedBefore = localStorage.getItem('geolocationPermission');
      if (hasVisitedBefore) {
        setHasGeolocationPermission(true);
      }
    }
  }, []);

  const requestGeolocationPermission = () => {
    if (geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          setHasGeolocationPermission(true);
          localStorage.setItem('geolocationPermission', 'granted');
          navigator.geolocation.getCurrentPosition((position) => {
            const sendGeolocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            getCurrentWeather(sendGeolocation);
            getHourlyWeather(sendGeolocation);
          });
        } else if (result.state === 'prompt') {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setHasGeolocationPermission(true);
              localStorage.setItem('geolocationPermission', 'granted');
              const sendGeolocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };
              getCurrentWeather(sendGeolocation);
              getHourlyWeather(sendGeolocation);
            },
            (error) => {
              setHasGeolocationPermission(false);
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  // Користувач відмовив у наданні доступу до геолокації
                  console.error('User denied access to geolocation');
                  break;
                case error.POSITION_UNAVAILABLE:
                  // Інформація про геолокацію недоступна
                  console.error('Geolocation information is unavailable');
                  break;
                case error.TIMEOUT:
                  // Запит на доступ до геолокації завершився таймаутом
                  console.error('Geolocation access request timed out');
                  break;
                default:
                  console.error('An unknown error occurred while getting geolocation');
                  break;
              }
            },
          );
        } else {
          setHasGeolocationPermission(false);
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
  const flippingCard = isFlipped ? 'rotate-y-180' : 'rotate-y-0';

  return {
    isCelsius,
    hasGeolocationPermission,
    flippingCard,
    requestGeolocationPermission,
    toggleTemperatureScale,
    flipWeatherDetails,
  };
};

export default useWeather;
