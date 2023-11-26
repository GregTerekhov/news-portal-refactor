import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useActiveLinks, useWindowWidth } from 'hooks';

import { SkeletonPage, SkeletonPagination, SkeletonWeather } from './subcomponents';

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
      {variant === 'page' ? (
        <>
          <div className='grid md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 lg:gap-x-8 hg:gap-x-10'>
            {mobileSkeleton && <SkeletonPage />}
            {tabletSkeleton && (
              <>
                <SkeletonPage /> <SkeletonPage />
              </>
            )}
            {!mobileSkeleton && !tabletSkeleton && (
              <>
                <SkeletonPage /> <SkeletonPage /> <SkeletonPage />
              </>
            )}
          </div>
          {activeLinks.isHomeActive && <SkeletonPagination />}
        </>
      ) : (
        <>
          {activeLinks.isHomeActive && (
            <>
              <SkeletonWeather />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Loader;
