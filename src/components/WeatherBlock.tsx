import React, { useState, useEffect } from 'react';
import receiveCurrentDate from 'helpers/receiveCurrentDate';
import SvgIcon from 'ui/SvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import { weatherOperations, weatherSelectors } from 'redux/weather';

const WeatherBlock = () => {
const [weatherData, setWeatherData] = useState<any>();

  const { days, dateNow } = receiveCurrentDate();
  const getWeatherData = useSelector(weatherSelectors);

  console.log(getWeatherData);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          setWeatherData(position.coords);
          const sendGeoLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          dispatch(weatherOperations.fetchWeather(sendGeoLocation));
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (weatherData) {
    return (
      <div className='bg-accentBase w-72'>
        <div className='weather-container'>
          <div className='weather-info'>
            <span className='temp'>
              {Math.round(getWeatherData.main.temp) - 273 + '&deg;'}
            </span>
            <div className='weather-city'>
              <span className='main'>{getWeatherData.weather[0].main}</span>
              <span className='city-name'>
                <span>
                  <svg></svg>
                  {getWeatherData.name}
                </span>
              </span>
            </div>
          </div>
          <img className='weather-img' />
          <div className='day'>{days}</div>
          <span className='date'>{dateNow}</span>
          <div className='wind'>
            <span>
              <svg></svg>
            </span>
            {getWeatherData.wind.speed} m/s
          </div>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className='flex flex-col items-center bg-accentBase w-72 h-fit py-10 px-14 rounded-xl text-center'>
        <h2 className='plug-space__header  '>
          What a pity, this could be your weather
        </h2>
        <span className='mt-20 mb-28'>
          <SvgIcon
            svgName='icon-moon'
            size={156}
            fill='fill-none'
            stroke='stroke-black'
          />
        </span>
      </div>
    );
  }
};

export default WeatherBlock;
