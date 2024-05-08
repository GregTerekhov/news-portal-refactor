import React, { FC } from 'react';

import { useWindowWidthContext } from 'contexts';
import { useActiveLinks } from 'hooks';

import SkeletonItem from './SkeletonItem';
import SkeletonSection from './SkeletonSection';
import SkeletonPagination from './SkeletonPagination';

import { pageStyles } from '../assistants';

const SkeletonPage: FC = () => {
  const { isSmallScreens, isTablet, isWideScreens } = useWindowWidthContext();
  const { isHomeActive } = useActiveLinks();

  const { page, pageItem, headerContainer, logo, menuWrapper, content } = pageStyles;

  return (
    <div className={page}>
      <div className={headerContainer}>
        <div className={logo}></div>
        {!isSmallScreens && (
          <SkeletonItem count={4} className={menuWrapper} itemClassName={pageItem} />
        )}
        <SkeletonItem count={2} className='space-y-2' itemClassName={pageItem} />
      </div>
      <div className={content}>
        {isSmallScreens && <SkeletonSection />}
        {isTablet && (
          <>
            <SkeletonSection />
            <SkeletonSection />
          </>
        )}
        {isWideScreens && (
          <>
            <SkeletonSection /> <SkeletonSection /> <SkeletonSection />
          </>
        )}
      </div>
      {isHomeActive && <SkeletonPagination />}
    </div>
  );
};

export default SkeletonPage;
