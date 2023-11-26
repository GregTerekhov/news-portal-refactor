import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useActiveLinks } from 'hooks';

import { lineClasses, absoluteLineClasses, groups } from '../assistants';

const SkeletonPage: FC<{}> = () => {
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  return (
    <>
      <div
        className={`${
          activeLinks.isHomeActive ? 'mb-10 md:mb-12 lg:mb-[60px]' : ''
        } w-72 md:w-[353px] lg:w-[395px] hg:w-[442px] h-[630px] md:h-[675px] bg-contrastWhite/[.8] dark:bg-darkBase/[.4] overflow-hidden rounded-[10px] animate-pulse transition-colors duration-500`}
      >
        {groups.map(({ lines, className }, groupIndex) => (
          <div key={groupIndex} className={className}>
            {lines.map(({ width, height }, index) => (
              <div
                key={index}
                className={`${width} ${height} ${
                  groupIndex === 0
                    ? index === 0
                      ? 'top-10 left-0 rounded-r'
                      : 'bottom-3 right-2 rounded-3xl'
                    : ''
                } ${groupIndex === 0 ? absoluteLineClasses : lineClasses}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default SkeletonPage;
