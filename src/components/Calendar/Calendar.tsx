import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { format, startOfToday } from 'date-fns';

import {
  useActiveLinks,
  useAdditionalRequest,
  // useChooseRenderingNews,
  useFilterNews,
  // useNewsAPICollector,
  usePopUp,
} from 'hooks';
import { convertLinesForCalendar } from 'helpers';

import { SvgIcon } from 'ui';

import { CalendarContent } from './subcomponents';

// import { useAppDispatch } from 'redux/hooks';
// import { fetchNewsByDate } from 'redux/newsAPI';
// import { filterNews } from 'redux/filterSlice';
// import { PartialVotedNewsArray } from 'types';

interface CalendarProps {
  variant: string;
}

const Calendar: FC<CalendarProps> = ({ variant }) => {
  // const [beginDate, setBeginDate] = useState<Date | null>(null);

  const { isOpenCalendar, popUpRef, setIsOpenCalendar, toggleCalendar } = usePopUp();
  const { selectedRequestDate } = useAdditionalRequest();

  const location = useLocation();
  const activeLinks = useActiveLinks(location);
  const { filters, handleFilterDate } = useFilterNews({ activeLinks, setIsOpenCalendar });

  const today = startOfToday();
  const showToday = selectedRequestDate.beginDate === null && selectedRequestDate.endDate === null;

  // const handleDateClick = async (date: Date) => {
  //   if (!isAfter(date, today)) {
  //     if (!beginDate) {
  //       setBeginDate(date);
  //     } else {
  //       let newSelectedDate: { beginDate: string | null; endDate: string | null };
  //       if (isAfter(date, beginDate)) {
  //         newSelectedDate = {
  //           beginDate: format(beginDate, 'yyyyMMdd'),
  //           endDate: format(date, 'yyyyMMdd'),
  //         };
  //       } else {
  //         newSelectedDate = {
  //           beginDate: format(date, 'yyyyMMdd'),
  //           endDate: format(beginDate, 'yyyyMMdd'),
  //         };
  //       }

  //       if (rebuildedNews && rebuildedNews?.length > 0) {
  //         const filteredData = rebuildedNews
  //           ?.filter((news) => {
  //             if (news?.publishDate && selectedDate) {
  //               console.log('filter');
  //               const newsDate = parse(news?.publishDate, 'dd/MM/yyyy', new Date());
  //               if (selectedDate.beginDate !== null && selectedDate.endDate !== null) {
  //                 return (
  //                   isSameDay(newsDate, parse(selectedDate.beginDate, 'yyyyMMdd', new Date())) ||
  //                   isSameDay(newsDate, parse(selectedDate.endDate, 'yyyyMMdd', new Date())) ||
  //                   (isAfter(newsDate, parse(selectedDate.beginDate, 'yyyyMMdd', new Date())) &&
  //                     isBefore(date, parse(selectedDate.endDate, 'yyyyMMdd', new Date())))
  //                 );
  //               }
  //             }
  //             return false;
  //           })
  //           .filter((result) => result) as PartialVotedNewsArray;
  //         dispatch(filterNews(filteredData));
  //       }
  //       setBeginDate(null);
  //       setIsOpenCalendar(false);
  //     }
  //   }
  // };

  return (
    <div ref={popUpRef} className={`relative ${activeLinks.isReadActive ? null : 'col-span-4'}`}>
      <p className='text-darkBase dark:text-whiteBase mb-2 text-base'>
        {variant === 'SearchBlock' ? 'Search' : 'Filter'} by Date or Date Period:
      </p>
      <button
        id='Toggle calendar button'
        type='button'
        onClick={toggleCalendar}
        className='w-full bg-whiteBase rounded-[20px] border border-solid border-accentBase text-accentBase flex justify-between items-center py-2 px-3 group-hover:text-whiteBase group-hover:bg-accentBase group-hover:border-whiteBase transition-colors text-small md:text-base leading-mediumRelaxed md:leading-moreRelaxed tracking-bigWide md:tracking-wider'
      >
        <SvgIcon svgName='icon-calendar' size={20} className='fill-accentBase' />
        {variant === 'SearchBlock' &&
        selectedRequestDate &&
        selectedRequestDate.beginDate !== null &&
        selectedRequestDate.endDate !== null &&
        !showToday
          ? `${convertLinesForCalendar(selectedRequestDate.beginDate)} - ${convertLinesForCalendar(
              selectedRequestDate.endDate,
            )}`
          : variant === 'FiltersBlock' && filters && filters.selectedFilterDate !== ''
          ? `${filters.selectedFilterDate}`
          : format(today, 'dd/MM/yyyy')}
        <SvgIcon
          svgName='icon-arrow-down'
          size={14}
          className={`fill-accentBase transition-transform ${
            isOpenCalendar ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
      {isOpenCalendar && <CalendarContent variant={variant} handleDateFilter={handleFilterDate} />}
    </div>
  );
};

export default React.memo(Calendar);
