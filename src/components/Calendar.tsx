import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Calendar as Calend } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { SvgIcon } from 'ui';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar: React.FC = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleWindowClick = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpenCalendar(false);
    }
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpenCalendar(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousedown', handleWindowClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousedown', handleWindowClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, handleWindowClick, isOpenCalendar]);

  const handleClick = () => {
    setIsOpenCalendar(!isOpenCalendar);
  };

  return (
    <div ref={dropdownRef} className='basis-6/12 group md:basis-1/4 relative'>
      <button
        type='button'
        onClick={handleClick}
        className='w-full bg-whiteBase rounded-[20px] border border-solid border-accentBase text-accentBase flex justify-between items-center py-[5px] px-3 group-hover:text-whiteBase group-hover:bg-accentBase group-hover:border-whiteBase transition-colors '
      >
        <SvgIcon svgName='icon-calendar' size={20} fill='#4440f6' />
        Date
        <SvgIcon
          svgName={isOpenCalendar ? 'icon-arrow-up' : 'icon-arrow-down'}
          size={14}
          fill='#4440f6'
        />
      </button>
      {isOpenCalendar && <Calend onChange={onChange} value={value} className='absolute' />}
    </div>
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    //   <DemoContainer components={['DateRangeCalendar']}>
    //     <DemoItem label='1 calendar'>
    //       <DateRangeCalendar calendars={1} />
    //     </DemoItem>
    //   </DemoContainer>
    // </LocalizationProvider>
  );
};

export default Calendar;
