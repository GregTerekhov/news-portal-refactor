import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useActiveLinks } from 'hooks';

import {
  sectionItemWrapperClass,
  sectionLineClasses,
  sectionAbsoluteLineClasses,
  sectionGroups,
} from '../assistants';

const SkeletonSection: FC<{}> = () => {
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  return (
    <>
      <div
        className={`${
          activeLinks.isHomeActive ? 'mb-10 md:mb-12 lg:mb-[60px]' : ''
        } ${sectionItemWrapperClass}`}
      >
        {sectionGroups.map(({ lines, className }, groupIndex) => (
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
                } ${groupIndex === 0 ? sectionAbsoluteLineClasses : sectionLineClasses}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default SkeletonSection;
