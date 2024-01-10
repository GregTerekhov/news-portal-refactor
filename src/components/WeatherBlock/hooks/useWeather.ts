import { useEffect, useState } from 'react';

import { useWeatherAPI } from 'reduxStore/hooks';

type StatePermission = 'granted' | 'prompt' | 'denied';

const useWeather = () => {
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [statePermission, setStatePermission] = useState<StatePermission | null>(null);

  const [hasGeolocationPermission, setHasGeolocationPermission] = useState<boolean>(false);

  const { getCurrentWeather, getHourlyWeather } = useWeatherAPI();

  const geolocation: boolean = 'geolocation' in navigator;

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('geolocationPermission');

    if (hasVisitedBefore) {
      setHasGeolocationPermission(true);
      setStatePermission('granted');
    }
  }, [statePermission]);

  const requestGeolocationPermission = () => {
    if (geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          setStatePermission('granted');
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
          setStatePermission('prompt');

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
          setStatePermission('denied');
          localStorage.removeItem('geolocationPermission');
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
    statePermission,
  };
};

export default useWeather;
