import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useActiveLinks, useWindowWidth } from 'hooks';

import { SkeletonEl } from './subcomponents';

interface LoaderProps {
  variant: string;
}

const Loader: FC<LoaderProps> = ({ variant }) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  return (
    <>
      {variant === 'page' ? (
        <>
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
        </>
      ) : (
        <>
          {activeLinks.isHomeActive && (
            <>
              <div className='h-full flex flex-col justify-between items-center py-8 px-9 animate-pulse'>
                <div className='flex gap-4'>
                  <div className='relative w-28 h-28 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-full transition-colors duration-500 after:content-[""] after:h-full after:absolute after:w-px after:-right-2 after:top-0 after:bg-greyAlt/[.4] after:dark:bg-whiteBase/[.1]'></div>
                  <div className='py-[9px] px-2 md:pt-[10px] md:pr-[17px] md:pb-[9px] md:pl-[7px] space-y-2'>
                    <div className='w-28 h-5 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-[20px] transition-colors duration-500'></div>
                    <div className='w-10 h-5 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-full transition-colors duration-500'></div>
                    <div className='w-28 h-20 py-[9px] px-2 md:pt-[10px] md:pr-[17px] md:pb-[9px] md:pl-[7px] bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-lg transition-colors duration-500'></div>
                  </div>
                </div>
                <div className='m-auto w-32 h-32 md:w-[165px] md:h-[165px] bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-full transition-colors duration-500'></div>
                <div className='flex flex-col items-center gap-4'>
                  <div className='w-28 h-10 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-[20px] transition-colors duration-500'></div>
                  <div className='w-56 h-10 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-[20px] transition-colors duration-500'></div>
                  <div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='w-24 h-5 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-full transition-colors duration-500'></div>
                      <div className='w-24 h-5 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-full transition-colors duration-500'></div>
                      <div className='w-24 h-5 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-full transition-colors duration-500'></div>
                      <div className='w-24 h-5 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-full transition-colors duration-500'></div>
                      <div className='w-24 h-5 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-full transition-colors duration-500'></div>
                      <div className='w-24 h-5 bg-greyAlt/[.4] dark:bg-whiteBase/[.1] rounded-full transition-colors duration-500'></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Loader;
