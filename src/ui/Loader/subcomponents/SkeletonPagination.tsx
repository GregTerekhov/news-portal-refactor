import React, { FC } from 'react';

import { paginationItemClass, paginationButtonClass, paginationWrapperClass } from '../assistants';

const SkeletonPagination: FC = () => {
  const paginationItems = [
    <div key={1} className={`${paginationButtonClass}`}></div>,
    <div key={2} className={`${paginationItemClass}`}></div>,
    <div key={3} className={`${paginationItemClass}`}></div>,
    <div key={4} className={`${paginationItemClass}`}></div>,
    <div key={5} className={`${paginationButtonClass}`}></div>,
  ];

  return <div className={`${paginationWrapperClass}`}>{paginationItems}</div>;
};

export default SkeletonPagination;
