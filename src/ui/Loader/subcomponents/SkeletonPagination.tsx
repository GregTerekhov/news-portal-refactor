import React, { FC } from 'react';

import { paginationStyles } from '../assistants';

const SkeletonPagination: FC = () => {
  const { item, button, wrapper } = paginationStyles;

  const paginationItems = [
    <div key={1} className={button}></div>,
    <div key={2} className={item}></div>,
    <div key={3} className={item}></div>,
    <div key={4} className={item}></div>,
    <div key={5} className={button}></div>,
  ];

  return <div className={wrapper}>{paginationItems}</div>;
};

export default SkeletonPagination;
