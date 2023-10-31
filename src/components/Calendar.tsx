import React, { useEffect, useRef, useState } from 'react';
import { SvgIcon } from 'ui';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isAfter,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from 'date-fns';
import { useLocation } from 'react-router-dom';
import useActiveLinks from 'hooks/useActiveLinks';

const Calendar: React.FC = () => {
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);

  const today = startOfToday();

  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [currMonth, setCurrMonth] = useState(() => format(today, 'MMM-yyyy'));

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleWindowClick = (event: MouseEvent) => {
      if (
        isOpenCalendar &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenCalendar(false);
        setSelectedDate(startOfToday());
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpenCalendar && event.key === 'Escape') {
        setIsOpenCalendar(false);
        setSelectedDate(startOfToday());
      }
    };

    window.addEventListener('mousedown', handleWindowClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousedown', handleWindowClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpenCalendar]);

  const handleOpen = () => {
    setIsOpenCalendar(!isOpenCalendar);
  };

  const handleDateClick = (date: Date) => {
    if (!isAfter(date, today)) {
      setSelectedDate(date);
    }
    setIsOpenCalendar(false);
  };

  let firstDayOfMonth = parse(currMonth, 'MMM-yyyy', new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(endOfMonth(firstDayOfMonth)),
  });

  const getPrevMonth = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
    setCurrMonth(format(firstDayOfPrevMonth, 'MMM-yyyy'));
  };

  const getNextMonth = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
    setCurrMonth(format(firstDayOfNextMonth, 'MMM-yyyy'));
  };

  const getPrevYear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const firstDayOfPrevYear = add(firstDayOfMonth, { years: -1 });
    setCurrMonth(format(firstDayOfPrevYear, 'MMM-yyyy'));
  };

  const getNextYear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const firstDayOfNextYear = add(firstDayOfMonth, { years: 1 });
    setCurrMonth(format(firstDayOfNextYear, 'MMM-yyyy'));
  };

  const days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];

  function capitalizeFirstLetter(str: string) {
    if (typeof str !== 'string') {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
  ];

  return (
    <div ref={dropdownRef} className={`relative ${activeLinks.isReadActive ? null : 'col-span-4'}`}>
      <button
        type='button'
        onClick={handleOpen}
        className='w-full bg-whiteBase rounded-[20px] border border-solid border-accentBase text-accentBase flex justify-between items-center py-2 px-3 group-hover:text-whiteBase group-hover:bg-accentBase group-hover:border-whiteBase transition-colors text-small md:text-base leading-mediumRelaxed md:leading-moreRelaxed tracking-bigWide md:tracking-wider'
      >
        <SvgIcon svgName='icon-calendar' size={20} className='fill-accentBase' />
        {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : 'Date'}
        <SvgIcon
          svgName={isOpenCalendar ? 'icon-arrow-up' : 'icon-arrow-down'}
          size={14}
          className='fill-accentBase'
        />
      </button>
      {isOpenCalendar && (
        <div className='w-[250px] bg-dropdownBase  absolute z-30 bg-whiteBase rounded-[20px] pt-4 px-4 pb-5'>
          <div className='flex items-center justify-between py-[7px] mb-0.5'>
            <div className='flex gap-2 items-center'>
              <button type='button' onClick={getPrevYear}>
                <SvgIcon svgName='icon-arrow-left' size={20} className='fill-accentBase' />
              </button>
              <p className='w-[120px] text-center text-medium font-medium leading-tight tracking-tightest text-calendarText'>
                {format(firstDayOfMonth, 'MMMM yyyy')}
              </p>
              <button type='button' onClick={getNextYear}>
                <SvgIcon
                  svgName='icon-arrow-right'
                  size={20}
                  className='stroke-accentBase fill-transparent'
                />
              </button>
            </div>
            <div className='flex'>
              <button type='button' onClick={getPrevMonth}>
                <SvgIcon svgName='icon-arrow-left' size={20} className='fill-accentBase' />
              </button>
              <button type='button' onClick={getNextMonth}>
                <SvgIcon
                  svgName='icon-arrow-right'
                  size={20}
                  className='stroke-accentBase fill-transparent'
                />
              </button>
            </div>
          </div>
          <div className='grid grid-cols-7 gap-[18px] place-items-center'>
            {days.map((day, idx) => {
              return (
                <p
                  key={idx}
                  className='text-small font-normal leading-normal tracking-tight text-calendarTextLight'
                >
                  {capitalizeFirstLetter(day)}
                </p>
              );
            })}
          </div>
          <div className='grid grid-cols-7 gap-y-3 gap-x-[18px] mt-3.5 place-items-center'>
            {daysInMonth.map((day, idx) => {
              const isCurrentMonth = isSameMonth(day, parse(currMonth, 'MMM-yyyy', new Date()));
              const isSelectedDate = selectedDate ? isSameDay(day, selectedDate) : false;
              const isTodayDate = isToday(day);
              const isSelectedStyle = isSelectedDate ? 'text-contrastWhite bg-accentBase' : '';
              return (
                <div key={idx} className={colStartClasses[getDay(day)]}>
                  <p
                    className={`cursor-pointer flex items-center justify-center text-base tracking-widest leading-mostRelaxed font-medium h-7 w-7 rounded-full hover:text-contrastWhite hover:bg-accentBase ${
                      isCurrentMonth ? 'text-calendarText' : 'text-calendarTextLight'
                    } ${isSelectedStyle} ${
                      selectedDate === today && isTodayDate
                        ? 'text-contrastWhite bg-accentBase'
                        : ''
                    }`}
                    onClick={() => handleDateClick(day)}
                  >
                    {format(day, 'd')}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
