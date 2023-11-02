import { useWindowWidth } from 'hooks';
import React from 'react';
import { SkeletonEl } from 'ui';

const Loader = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  return (
    <div className='grid md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 lg:gap-x-8 hg:gap-x-10'>
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
  );
};

export default Loader;
