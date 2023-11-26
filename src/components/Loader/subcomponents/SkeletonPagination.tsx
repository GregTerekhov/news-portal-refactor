import React, { FC } from 'react';

const SkeletonPagination: FC = () => {
  const commonClasses =
    'h-10 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] transition-colors duration-500';
  const paginationItemClass = `${commonClasses} w-10 rounded-full`;
  const paginationButtonClass = `${commonClasses} w-14 md:w-28 rounded-[20px]`;

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
