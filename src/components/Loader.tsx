import { useActiveLinks, useWindowWidth } from 'hooks';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { SkeletonEl } from 'ui';

const Loader = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  return (
    <>
      <div
        className={`${
          activeLinks.isHomeActive ? 'mb-10 md:mb-12 lg:mb-[60px]' : ''
        } grid md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 lg:gap-x-8 hg:gap-x-10`}
      >
        {breakpointsForMarkup?.isNothing || (breakpointsForMarkup?.isMobile && <SkeletonEl />)}
        {breakpointsForMarkup?.isTablet && (
          <>
            <SkeletonEl /> <SkeletonEl />
          </>
        )}
        {breakpointsForMarkup?.isDesktop && (
          <>
            <SkeletonEl /> <SkeletonEl /> <SkeletonEl />
          </>
        )}
      </div>
      {activeLinks.isHomeActive && (
        <div className='flex items-center justify-center gap-2'>
          <div className='w-28 h-10 bg-skeletonGreyAlt dark:bg-skeletonForeground rounded-[20px] transition-colors duration-500'></div>
          <div className='w-10 h-10 bg-skeletonGreyAlt dark:bg-skeletonForeground rounded-full transition-colors duration-500'></div>
          <div className='w-10 h-10 bg-skeletonGreyAlt dark:bg-skeletonForeground rounded-full transition-colors duration-500'></div>
          <div className='w-10 h-10 bg-skeletonGreyAlt dark:bg-skeletonForeground rounded-full transition-colors duration-500'></div>
          <div className='w-28 h-10 bg-skeletonGreyAlt dark:bg-skeletonForeground rounded-[20px] transition-colors duration-500'></div>
        </div>
      )}
    </>
  );
};

export default Loader;
