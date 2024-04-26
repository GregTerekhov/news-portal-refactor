import React, { FC } from 'react';

import { useWindowWidthContext } from 'contexts';
import { useActiveLinks } from 'hooks';

import Item from './Item';
import SkeletonSection from './SkeletonSection';
import SkeletonPagination from './SkeletonPagination';
import {
  pageClass,
  headerContainerPageClass,
  logoPageClass,
  mainContentPageClass,
  menuWrapperClass,
  commonPageItemClass,
} from '../assistants';

const SkeletonPage: FC = () => {
  const { isMobile, isTablet, wideScreens } = useWindowWidthContext();
  const { isHomeActive } = useActiveLinks();

  return (
    <div className={pageClass}>
      <div className={headerContainerPageClass}>
        <div className={logoPageClass}></div>
        {!isMobile && (
          <Item count={4} className={menuWrapperClass} itemClassName={commonPageItemClass} />
        )}
        <Item count={2} className='space-y-2' itemClassName={commonPageItemClass} />
      </div>
      <div className={mainContentPageClass}>
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
