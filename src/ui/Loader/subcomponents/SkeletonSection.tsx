import React, { FC } from 'react';

import { useActiveLinks } from 'hooks';

import { sectionStyles, skeletonLineStyles } from '../assistants';

const SkeletonSection: FC<{}> = () => {
  const { isHomeActive } = useActiveLinks();

  const { itemWrapper, sectionGroups } = sectionStyles;

  return (
    <>
      <div className={`${isHomeActive ? 'mb-10 md:mb-12 lg:mb-[60px]' : ''} ${itemWrapper}`}>
        {Array.isArray(sectionGroups) &&
          sectionGroups.map(({ lines, className }, groupIndex) => (
            <div key={groupIndex} className={className}>
              {Array.isArray(lines) &&
                lines.map(({ width, height }, index) => (
                  <div
                    key={index}
                    className={skeletonLineStyles(width, height, groupIndex, index)}
                  ></div>
                ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default SkeletonSection;
