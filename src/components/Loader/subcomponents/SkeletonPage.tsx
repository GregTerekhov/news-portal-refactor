import React, { FC, ReactNode } from 'react';

import { useWindowWidth } from 'hooks';

import SkeletonSection from './SkeletonSection';
import {
  commonPageClass,
  commonPageItemClass,
  pageClass,
  headerContainerPageClass,
  logoPageClass,
  mainContentPageClass,
  menuWrapperClass,
} from '../assistants';

const SkeletonPage: FC = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const mobileSkeleton = breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile;
  const tabletSkeleton = breakpointsForMarkup?.isTablet;

  const menuItems: ReactNode[] = Array(4)
    .fill(null)
    .map((_, index) => (
      <div key={index} className={`${commonPageClass} ${commonPageItemClass}`}></div>
    ));

  const headerRightBlockItems: ReactNode[] = Array(2)
    .fill(null)
    .map((_, index) => (
      <div key={index} className={`${commonPageClass} ${commonPageItemClass}`}></div>
    ));

  return (
    <div className={`${commonPageClass} ${pageClass}`}>
      <div className={`${headerContainerPageClass}`}>
        <div className={`${commonPageClass} ${logoPageClass}`}></div>
        {!mobileSkeleton && <div className={`${menuWrapperClass}`}>{menuItems}</div>}
        <div className='space-y-2'>{headerRightBlockItems}</div>
      </div>
      <div className={`${mainContentPageClass}`}>
        {mobileSkeleton && <SkeletonSection />}
        {tabletSkeleton && (
          <>
            <SkeletonSection />
            <SkeletonSection />
          </>
        )}
        {!mobileSkeleton && !tabletSkeleton && (
          <>
            <SkeletonSection /> <SkeletonSection /> <SkeletonSection />
          </>
        )}
      </div>
    </div>
  );
};

export default SkeletonPage;
