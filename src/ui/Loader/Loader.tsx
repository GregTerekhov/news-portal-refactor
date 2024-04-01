import React, { FC } from 'react';

import { useWindowWidthContext } from 'contexts';
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
  const { isMobile, isTablet, wideScreens } = useWindowWidthContext();

  const { isHomeActive } = useActiveLinks();

  return (
    <>
      {variant === 'generalSection' && (
        <>
          <div className='grid md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 lg:gap-x-8 hg:gap-x-10'>
            {isMobile && <SkeletonSection />}
            {isTablet && (
              <>
                <SkeletonSection /> <SkeletonSection />
              </>
            )}
            {wideScreens && (
              <>
                <SkeletonSection /> <SkeletonSection /> <SkeletonSection />
              </>
            )}
          </div>
          {isHomeActive && <SkeletonPagination />}
        </>
      )}
      {variant === 'element' && isHomeActive && <SkeletonWeather />}
      {variant === 'page' && <SkeletonPage />}
    </>
  );
};

export default Loader;
