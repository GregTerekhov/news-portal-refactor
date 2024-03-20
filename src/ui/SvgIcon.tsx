import React, { FC } from 'react';

import { ICON_SIZES } from 'constants/iconSizes';
import { useCacheIcon } from 'hooks';

import icons from 'assets/icons.svg';

interface SvgIncomingData {
  svgName?: string | undefined;
  sizeKey?: keyof typeof ICON_SIZES | undefined;
  className?: string | undefined;
}

const SvgIcon: FC<SvgIncomingData> = ({ svgName, sizeKey, className }) => {
  const size = sizeKey ? ICON_SIZES[sizeKey] : { width: undefined, height: undefined };
  const cachedIconName = useCacheIcon(`icon-${svgName}` || '');

  return (
    <svg
      width={typeof size === 'number' ? size : size.width}
      height={typeof size === 'number' ? size : size.height}
      className={`transition-colors duration-500 ${className}`}
    >
      <use href={icons + `#${cachedIconName}`}></use>
    </svg>
  );
};

export default SvgIcon;
