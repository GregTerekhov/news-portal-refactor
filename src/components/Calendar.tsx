import React, { useState } from 'react';
import { SvgIcon } from 'ui';
import { format, isAfter, isBefore, isSameDay, parse } from 'date-fns';
import { useLocation } from 'react-router-dom';
import { useActiveLinks, useCalendar, useChooseRenderingNews, usePopUp } from 'hooks';
import { useAppDispatch } from 'redux/hooks';
import { fetchNewsByDate } from 'redux/newsAPI';
import { convertLinesForCalendar } from 'helpers';
import { resetOtherRequests } from 'redux/newsAPI/newsAPISlice';
import { filterNews } from 'redux/filterSlice';
import { CalendarContent } from '.';
import { PartialVotedNewsArray } from 'types';

interface CalendarProps {
  variant: string;
}

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
  const { rebuildedNews } = useChooseRenderingNews({ activeLinks });

  const dispatch = useAppDispatch();

  const showToday = selectedDate.beginDate === null && selectedDate.endDate === null;

  const handleDateClick = async (date: Date) => {
    if (!isAfter(date, today)) {
      if (!beginDate) {
        setBeginDate(date);
      } else {
        let newSelectedDate: { beginDate: string | null; endDate: string | null };
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

        if (variant === 'SearchBlock') {
          setSelectedDate(newSelectedDate);
          dispatch(resetOtherRequests());
          await dispatch(fetchNewsByDate(newSelectedDate));
        } else if (rebuildedNews) {
          const filteredData = rebuildedNews
            ?.filter((news) => {
              if (news?.publishDate && newSelectedDate) {
                console.log('filter');
                const newsDate = parse(news?.publishDate, 'dd/MM/yyyy', new Date());
                if (newSelectedDate.beginDate !== null && newSelectedDate.endDate !== null) {
                  return (
                    isSameDay(newsDate, parse(newSelectedDate.beginDate, 'yyyyMMdd', new Date())) ||
                    isSameDay(newsDate, parse(newSelectedDate.endDate, 'yyyyMMdd', new Date())) ||
                    (isAfter(newsDate, parse(newSelectedDate.beginDate, 'yyyyMMdd', new Date())) &&
                      isBefore(date, parse(newSelectedDate.endDate, 'yyyyMMdd', new Date())))
                  );
                }
              }
              return false;
            })
            .filter((result) => result) as PartialVotedNewsArray;
          dispatch(filterNews(filteredData));
        }
        setBeginDate(null);
        setIsOpenCalendar(false);
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
        <CalendarContent
          firstDayOfMonth={firstDayOfMonth}
          daysInMonth={daysInMonth}
          currMonth={currMonth}
          selectedDate={selectedDate}
          getPrevYear={getPrevYear}
          getNextYear={getNextYear}
          getPrevMonth={getPrevMonth}
          getNextMonth={getNextMonth}
          handleDateClick={handleDateClick}
        />
      )}
    </div>
  );
};

export default React.memo(Calendar);
