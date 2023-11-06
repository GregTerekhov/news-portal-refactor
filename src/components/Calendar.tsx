import React, { useState } from 'react';
import { SvgIcon } from 'ui';
import { format, getDay, isAfter, isSameDay, isSameMonth, isToday, parse } from 'date-fns';
import { useLocation } from 'react-router-dom';
import { useActiveLinks, useCalendar, usePopUp } from 'hooks';
import { useAppDispatch } from 'redux/hooks';
import { fetchNewsByDate } from 'redux/newsAPI';
import { capitalizeFirstLetter } from 'helpers';
import { resetOtherRequests } from 'redux/newsAPI/newsAPISlice';
import { DAYS, COL_START_CLASSES } from 'constants';

type CalendarProps = {
  variant: string;
};

const Calendar: React.FC<CalendarProps> = ({ variant }) => {
  const {
    today,
    selectedDate,
    isOpenCalendar,
    popUpRef,
    setSelectedDate,
    setIsOpenCalendar,
    toggleCalendar,
  } = usePopUp();

  const {
    currMonth,
    firstDayOfMonth,
    daysInMonth,
    getPrevMonth,
    getNextMonth,
    getPrevYear,
    getNextYear,
  } = useCalendar();

  const [beginDate, setBeginDate] = useState<string | Date | null>(null);
  // console.log('beginDate', beginDate, typeof beginDate);
  // console.log('selectedDate', selectedDate, typeof selectedDate);
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const dispatch = useAppDispatch();

  let endDate: Date | string | null | undefined = beginDate;
  // console.log('endDate', endDate, typeof endDate);
  const handleDateClick = async (date: Date) => {
    if (!isAfter(date, today)) {
      setSelectedDate(date);
    }
    if (variant === 'SearchBlock') {
      // Начальная дата
      const firstMonth = ('0' + (date.getMonth() + 1)).slice(-2);
      const firstDate = ('0' + date.getDate()).slice(-2);
      const firstYear = date.getFullYear();

      const secondMonth = ('0' + (date.getMonth() + 1)).slice(-2);
      const secondDate = ('0' + date.getDate()).slice(-2);
      const secondYear = date.getFullYear();

      if (!endDate) {
        setBeginDate(firstYear + firstMonth + firstDate);
      }

      endDate = secondYear + secondMonth + secondDate;

      if (beginDate && endDate) {
        const datePeriod = {
          beginDate,
          endDate,
        };
        dispatch(resetOtherRequests());
        await dispatch(fetchNewsByDate(datePeriod));

        setBeginDate(null);
      }
      setIsOpenCalendar(false);
    }
  };

  return (
    <div ref={popUpRef} className={`relative ${activeLinks.isReadActive ? null : 'col-span-4'}`}>
      <p className='text-darkBase dark:text-whiteBase mb-2 text-base'>
        Search by Date or Date Period:
      </p>
      <button
        type='button'
        onClick={toggleCalendar}
        className='w-full bg-whiteBase rounded-[20px] border border-solid border-accentBase text-accentBase flex justify-between items-center py-2 px-3 group-hover:text-whiteBase group-hover:bg-accentBase group-hover:border-whiteBase transition-colors text-small md:text-base leading-mediumRelaxed md:leading-moreRelaxed tracking-bigWide md:tracking-wider'
      >
        <SvgIcon svgName='icon-calendar' size={20} className='fill-accentBase' />
        {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : today.toString()}
        <SvgIcon
          svgName='icon-arrow-down'
          size={14}
          className={`fill-accentBase transition-transform ${
            isOpenCalendar ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
      {isOpenCalendar && (
        <div className='w-[250px] bg-dropdownBase absolute z-40 bg-whiteBase rounded-[20px] pt-4 px-4 pb-5 shadow-card dark:shadow-darkCard'>
          <div className='flex items-center justify-between py-[7px] mb-0.5'>
            <div className='flex gap-2 items-center'>
              <button type='button' onClick={getPrevYear}>
                <SvgIcon svgName='icon-arrow-left' size={20} className='fill-accentBase' />
              </button>
              <p className='text-center text-medium font-medium leading-tight tracking-tightest text-calendarText'>
                {format(firstDayOfMonth, 'yyyy')}
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
              <p className='text-center text-medium font-medium leading-tight tracking-tightest text-calendarText'>
                {format(firstDayOfMonth, 'MMM')}
              </p>
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
            {DAYS.map((day, idx) => {
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
                <div key={idx} className={COL_START_CLASSES[getDay(day)]}>
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
