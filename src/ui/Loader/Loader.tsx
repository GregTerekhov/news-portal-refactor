import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useWindowWidth } from 'contexts';
import { useActiveLinks } from 'hooks';

import {
  SkeletonPage,
  SkeletonPagination,
  SkeletonSection,
  SkeletonWeather,
} from './subcomponents';

interface LoaderProps {
  variant: string;
}

const Loader: FC<LoaderProps> = ({ variant }) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const mobileSkeleton = breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile;
  const tabletSkeleton = breakpointsForMarkup?.isTablet;

  return (
    <>
      {variant === 'generalSection' && (
        <>
          <div className='grid md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 lg:gap-x-8 hg:gap-x-10'>
            {mobileSkeleton && <SkeletonSection />}
            {tabletSkeleton && (
              <>
                <SkeletonSection /> <SkeletonSection />
              </>
            )}
            {!mobileSkeleton && !tabletSkeleton && (
              <>
                <SkeletonSection /> <SkeletonSection /> <SkeletonSection />
              </>
            )}
          </div>
          {activeLinks.isHomeActive && <SkeletonPagination />}
        </>
      )}
      {variant === 'element' && (
        <>
          {activeLinks.isHomeActive && (
            <>
              <SkeletonWeather />
            </>
          )}
        </>
      )}
      {variant === 'page' && <SkeletonPage />}
    </>
  );
};

export default Loader;
