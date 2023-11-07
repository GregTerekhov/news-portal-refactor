import React, { useState } from 'react';
import { SvgIcon } from 'ui';
import { format, getDay, isAfter, isSameDay, isSameMonth, isToday, parse } from 'date-fns';
import { useLocation } from 'react-router-dom';
import { useActiveLinks, useCalendar, usePopUp } from 'hooks';
import { useAppDispatch } from 'redux/hooks';
import { fetchNewsByDate } from 'redux/newsAPI';
import { capitalizeFirstLetter, convertLinesForCalendar } from 'helpers';
import { resetOtherRequests } from 'redux/newsAPI/newsAPISlice';
import { DAYS, COL_START_CLASSES } from 'constants';

type CalendarProps = {
  variant: string;
};

const Calendar: React.FC<CalendarProps> = ({ variant }) => {
  const { isOpenCalendar, popUpRef, setIsOpenCalendar, toggleCalendar } = usePopUp();

  const {
    today,
    selectedDate,
    currMonth,
    firstDayOfMonth,
    daysInMonth,
    setSelectedDate,
    getPrevMonth,
    getNextMonth,
    getPrevYear,
    getNextYear,
  } = useCalendar();

  const [beginDate, setBeginDate] = useState<Date | null>(null);
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const dispatch = useAppDispatch();

  const showToday = selectedDate.beginDate === null && selectedDate.endDate === null;

  const handleDateClick = async (date: Date) => {
    if (!isAfter(date, today)) {
      if (variant === 'SearchBlock') {
        if (!beginDate) {
          setBeginDate(date);
        } else {
          let newSelectedDate;
          if (isAfter(date, beginDate)) {
            newSelectedDate = {
              beginDate: format(beginDate, 'yyyyMMdd'),
              endDate: format(date, 'yyyyMMdd'),
            };
          } else {
            newSelectedDate = {
              beginDate: format(date, 'yyyyMMdd'),
              endDate: format(beginDate, 'yyyyMMdd'),
            };
          }
          setSelectedDate(newSelectedDate);
          dispatch(resetOtherRequests());
          await dispatch(fetchNewsByDate(newSelectedDate));
          setBeginDate(null);

          setIsOpenCalendar(false);
        }
      }
    }
  };

  return (
    <div ref={popUpRef} className={`relative ${activeLinks.isReadActive ? null : 'col-span-4'}`}>
      <p className='text-darkBase dark:text-whiteBase mb-2 text-base'>
        Search by Date or Date Period:
      </p>
      <button
        id='Toggle calendar button'
        type='button'
        onClick={toggleCalendar}
        className='w-full bg-whiteBase rounded-[20px] border border-solid border-accentBase text-accentBase flex justify-between items-center py-2 px-3 group-hover:text-whiteBase group-hover:bg-accentBase group-hover:border-whiteBase transition-colors text-small md:text-base leading-mediumRelaxed md:leading-moreRelaxed tracking-bigWide md:tracking-wider'
      >
        <SvgIcon svgName='icon-calendar' size={20} className='fill-accentBase' />
        {selectedDate &&
        selectedDate.beginDate !== null &&
        selectedDate.endDate !== null &&
        !showToday
          ? `${convertLinesForCalendar(selectedDate.beginDate)} - ${convertLinesForCalendar(
              selectedDate.endDate,
            )}`
          : format(today, 'dd/MM/yyyy')}
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
              <button aria-label='Previous year button' type='button' onClick={getPrevYear}>
                <SvgIcon svgName='icon-arrow-left' size={20} className='fill-accentBase' />
              </button>
              <p className='text-center text-medium font-medium leading-tight tracking-tightest text-fullDark'>
                {format(firstDayOfMonth, 'yyyy')}
              </p>
              <button aria-label='Next year button' type='button' onClick={getNextYear}>
                <SvgIcon
                  svgName='icon-arrow-right'
                  size={20}
                  className='stroke-accentBase fill-transparent'
                />
              </button>
            </div>
            <div className='flex'>
              <button aria-label='Previous month button' type='button' onClick={getPrevMonth}>
                <SvgIcon svgName='icon-arrow-left' size={20} className='fill-accentBase' />
              </button>
              <p className='text-center text-medium font-medium leading-tight tracking-tightest text-fullDark'>
                {format(firstDayOfMonth, 'MMM')}
              </p>
              <button aria-label='Next month button' type='button' onClick={getNextMonth}>
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
              const isSelectedDate =
                (selectedDate &&
                  selectedDate.beginDate !== null &&
                  isSameDay(day, parse(selectedDate?.beginDate, 'yyyyMMdd', new Date()))) ||
                (selectedDate &&
                  selectedDate.endDate !== null &&
                  isSameDay(day, parse(selectedDate?.endDate, 'yyyyMMdd', new Date())));
              const isTodayDate = isToday(day);
              const isSelectedStyle = isSelectedDate ? 'text-whiteBase bg-accentBase' : '';
              return (
                <div key={idx} className={COL_START_CLASSES[getDay(day)]}>
                  <p
                    className={`cursor-pointer flex items-center justify-center text-base tracking-widest leading-mostRelaxed font-medium h-7 w-7 rounded-full hover:text-contrastWhite hover:bg-accentBase hover:animate-pulse ${
                      isCurrentMonth ? 'text-fullDark' : 'text-calendarTextLight'
                    } ${isSelectedStyle} 
                      ${isTodayDate && !isSelectedDate ? 'text-whiteBase bg-accentBase' : ''}
                    `}
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

export default React.memo(Calendar);
