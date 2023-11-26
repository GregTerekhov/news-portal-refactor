import React, { FC, ReactNode } from 'react';

const SkeletonWeather: FC = () => {
  const containerClass = 'h-full flex flex-col justify-between items-center animate-pulse';
  const currentTemperatureClass =
    'relative w-20 h-20 md:w-28 md:h-28 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-full transition-colors duration-500 after:content-[""] after:h-full after:absolute after:w-px after:-right-2 after:top-0 after:bg-greyAlt/[.4] after:dark:bg-whiteBase/[.1]';
  const infoContainerClass =
    'py-[9px] px-2 md:pt-[10px] md:pr-[17px] md:pb-[9px] md:pl-[7px] space-y-2';
  const currentWeatherInfoClass =
    'w-28 h-2 md:h-4 lg:h-5 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-[20px] transition-colors duration-500';
  const feelsLikeClass =
    'w-10 h-2 md:h-3 lg:h-5 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-full transition-colors duration-500';
  const currentLocationClass =
    'w-28 h-10 md:h-16 lg:h-20 py-[9px] px-2 md:pt-[10px] md:pr-[17px] md:pb-[9px] md:pl-[7px] bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-lg transition-colors duration-500';
  const weatherIconClass =
    'm-auto w-32 h-32 md:w-[165px] md:h-[165px] bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-full transition-colors duration-500';
  const weatherDetailsBlockClass = 'flex flex-col items-center gap-4 md:gap-y-6 lg:w-full';
  const dayTextClass =
    'w-28 h-8 md:h-10 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-[20px] transition-colors duration-500';
  const currentDateTextClass =
    'w-56 lg:w-full h-6 md:h-8 lg:h-10 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-[20px] transition-colors duration-500';
  const gridClass = 'grid grid-cols-2 gap-4 lg:w-full';
  const gridItemClass =
    'w-24 lg:w-full h-2 md:h-4 lg:h-5 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-full transition-colors duration-500';

  const gridItems: ReactNode[] = Array(8).fill(<div className={gridItemClass}></div>);

  return (
    <div className={`${containerClass}`}>
      <div className='flex gap-x-4 lg:gap-x-6'>
        <div className={`${currentTemperatureClass}`}></div>
        <div className={`${infoContainerClass}`}>
          <div className={`${currentWeatherInfoClass}`}></div>
          <div className={`${feelsLikeClass}`}></div>
          <div className={`${currentLocationClass}`}></div>
        </div>
      </div>
      <div className={`${weatherIconClass}`}></div>
      <div className={`${weatherDetailsBlockClass}`}>
        <div className={`${dayTextClass}`}></div>
        <div className={`${currentDateTextClass}`}></div>
        <div className='lg:w-full lg:px-6'>
          <div className={`${gridClass}`}>{gridItems}</div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonWeather;
