import React, { FC } from 'react';

import { useActiveLinks } from 'hooks';

import {
  sectionItemWrapperClass,
  sectionLineClasses,
  sectionAbsoluteLineClasses,
  sectionGroups,
} from '../assistants';

const SkeletonSection: FC<{}> = () => {
  const { isHomeActive } = useActiveLinks();

  return (
    <>
      <div
        className={`${
          isHomeActive ? 'mb-10 md:mb-12 lg:mb-[60px]' : ''
        } ${sectionItemWrapperClass}`}
      >
        {Array.isArray(sectionGroups) &&
          sectionGroups.map(({ lines, className }, groupIndex) => (
            <div key={groupIndex} className={className}>
              {Array.isArray(lines) &&
                lines.map(({ width, height }, index) => (
                  <div
                    key={index}
                    className={`${width} ${height} ${
                      groupIndex === 0
                        ? index === 0
                          ? 'left-0 top-10 rounded-r'
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
