import React, { FC, ReactNode } from 'react';

import { useWindowWidth } from 'contexts';
import { useActiveLinks } from 'hooks';

import SkeletonSection from './SkeletonSection';
import {
  commonPageItemClass,
  pageClass,
  headerContainerPageClass,
  logoPageClass,
  mainContentPageClass,
  menuWrapperClass,
} from '../assistants';
import SkeletonPagination from './SkeletonPagination';

const SkeletonPage: FC = () => {
  const { isMobile, isTablet, wideScreens } = useWindowWidth();
  const { isHomeActive } = useActiveLinks();

  const menuItems: ReactNode[] = Array(4)
    .fill(null)
    .map((_, index) => <div key={index} className={`${commonPageItemClass}`}></div>);

  const headerRightBlockItems: ReactNode[] = Array(2)
    .fill(null)
    .map((_, index) => <div key={index} className={`${commonPageItemClass}`}></div>);

  return (
    <div className={`${pageClass}`}>
      <div className={`${headerContainerPageClass}`}>
        <div className={`${logoPageClass}`}></div>
        {!isMobile && <div className={`${menuWrapperClass}`}>{menuItems}</div>}
        <div className='space-y-2'>{headerRightBlockItems}</div>
      </div>
      <div className={`${mainContentPageClass}`}>
        {isMobile && <SkeletonSection />}
        {isTablet && (
          <>
            <SkeletonSection />
            <SkeletonSection />
          </>
        )}
        {wideScreens && (
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
