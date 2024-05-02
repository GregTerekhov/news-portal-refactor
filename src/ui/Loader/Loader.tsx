import React, { FC } from 'react';

import { useWindowWidthContext } from 'contexts';
import { useActiveLinks } from 'hooks';

import {
  SkeletonPage,
  SkeletonPagination,
  SkeletonSection,
  SkeletonWeather,
} from './subcomponents';
import { variants } from './assistants';

interface GeneralSectionVariant {
  sections: number[];
  showPagination: boolean;
}

interface ElementVariant {
  showWeather: boolean;
}
interface LoaderProps {
  variant: keyof typeof variants;
}

const MOBILE_WEATHER_POSITION_IDX = 0;
const TABLET_WEATHER_POSITION_IDX = 2;
const DESKTOP_WEATHER_POSITION_IDX = 3;

const Loader: FC<LoaderProps> = ({ variant }) => {
  const { isMobile, isTablet, wideScreens } = useWindowWidthContext();
  const { isHomeActive } = useActiveLinks();

  const variantConfig = variants[variant];

  if (!variantConfig) return null;

  if ('sections' in variantConfig && 'showPagination' in variantConfig) {
    const { sections, showPagination } = variantConfig as GeneralSectionVariant;

    return (
      <>
        <div className='grid md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 lg:gap-x-8 hg:gap-x-10'>
          {Array.isArray(sections) &&
            sections.map((_, index) =>
              (isMobile && index === MOBILE_WEATHER_POSITION_IDX) ||
              (isTablet && index < TABLET_WEATHER_POSITION_IDX) ||
              (wideScreens && index < DESKTOP_WEATHER_POSITION_IDX) ? (
                <SkeletonSection key={index} />
              ) : null,
            )}
        </div>
        {showPagination && isHomeActive && <SkeletonPagination />}
      </>
    );
  }

  if ('showWeather' in variantConfig) {
    const { showWeather } = variantConfig as ElementVariant;

    if (showWeather && isHomeActive) {
      return <SkeletonWeather />;
    }
  }

  return <SkeletonPage />;
};

export default Loader;
