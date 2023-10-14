import React, { useEffect } from 'react';
import receiveCurrentDate from 'helpers/receiveCurrentDate';
import { SvgIcon } from 'ui';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, weatherSelectors } from 'redux/weather';
import receiveCurrentTime from 'helpers/receiveCurrentTime';
import convertTimezone from 'helpers/convertTimezone';

const WeatherBlock = () => {
  const { days, dateNow } = receiveCurrentDate();
  const { hours, minutes } = receiveCurrentTime();
  const getWeatherData = useSelector(weatherSelectors);

  const dispatch = useDispatch();

  const geolocation: boolean = 'geolocation' in navigator;

  useEffect(() => {
    try {
      if (geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const sendGeoLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          dispatch(fetchWeather(sendGeoLocation));
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (getWeatherData) {
    return (
      <div className='bg-accentBase w-72 py-10 px-8 rounded-xl'>
        <div className='flex gap-6 items-center relative'>
          <p className='text-contrastWhite after:content-[""] after:absolute after:h-full after:w-px after:left-7 after:top-0 after:bg-white'>
            {Math.round(getWeatherData.main.temp) - 273 + '\u00b0'}
          </p>
          <div className='weather-city'>
            <p className='text-contrastWhite'>{getWeatherData.weather[0].main}</p>
            <p className='text-contrastWhite'>
              Feels like {Math.round(getWeatherData.main.feels_like) - 273 + '\u00b0'}
            </p>
            <div className='flex gap-1.5 text-contrastWhite bg-weatherLocation py-3 px-3 rounded-lg'>
              <span className='flex items-center content-center'>
                <SvgIcon svgName='icon-weather-location' size={18} fill='red' stroke='black' />
              </span>
              {getWeatherData.name}
            </div>
          </div>
        </div>
        <img
          className='mt-20 mb-20 ml-auto mr-auto'
          src={`https://openweathermap.org/img/wn/${getWeatherData.weather[0]['icon']}@2x.png`}
          alt='weather-condition'
        />
        <div className='flex gap-3 items-center justify-center'>
          <p className='text-contrastWhite'>{days}</p>
          <p className='text-contrastWhite'>{dateNow}</p>
        </div>
        <div className='flex gap-3 items-center justify-center'>
          <p className='text-contrastWhite'>{`${hours}:${minutes}`}</p>
          <p className='text-contrastWhite'>{convertTimezone(getWeatherData.timezone)} UTC</p>
        </div>

        <div className='text-contrastWhite flex gap-3 items-center justify-center mt-3'>
          <span>
            <SvgIcon svgName='icon-weather-wind' size={30} fill='white' stroke='black' />
          </span>
          {getWeatherData.wind.speed} m/s
        </div>
        <div className='text-contrastWhite text-center'>
          {/* <span>
            <SvgIcon svgName='icon-weather-pressure' size={30} fill='white' stroke='black' />
          </span> */}
          {getWeatherData.main.pressure} PSI
        </div>
      </div>
    );
  }

  if (!getWeatherData) {
    return (
      <div className='flex flex-col items-center bg-accentBase w-72 h-fit py-10 px-14 rounded-xl text-center'>
        <h2 className='plug-space__header  '>What a pity, this could be your weather</h2>
        <span className='mt-20 mb-28'>
          <SvgIcon svgName='icon-moon' size={156} fill='fill-none' stroke='stroke-black' />
        </span>
      </div>
    );
  }
};

export default WeatherBlock;
