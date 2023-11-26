import React, { FC } from 'react';

const SkeletonPagination: FC = () => {
  const paginationItemClass =
    'w-10 h-10 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-full transition-colors duration-500';
  const paginationButtonClass =
    'w-14 md:w-28 h-10 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-[20px] transition-colors duration-500';

  const paginationItems = [
    <div key={1} className={`${paginationButtonClass}`}></div>,
    <div key={2} className={`${paginationItemClass}`}></div>,
    <div key={3} className={`${paginationItemClass}`}></div>,
    <div key={4} className={`${paginationItemClass}`}></div>,
    <div key={5} className={`${paginationButtonClass}`}></div>,
  ];

  return <div className='flex items-center justify-center gap-2'>{paginationItems}</div>;
};

export default SkeletonPagination;
