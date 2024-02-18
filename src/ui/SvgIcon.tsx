import React, { FC } from 'react';

import { useCacheIcon } from 'hooks';

import icons from 'assets/icons.svg';

interface SvgIncomingData {
  svgName?: string | undefined;
  size?: number | undefined;
  className?: string | undefined;
}

const SvgIcon: FC<SvgIncomingData> = (svgData) => {
  const { svgName, size, className } = svgData;
  const cachedIconName = useCacheIcon(svgName || '');

  return (
    <svg width={size} height={size} className={`transition-colors duration-500 ${className}`}>
      <use href={icons + `#${cachedIconName}`}></use>
    </svg>
  );
};

export default SvgIcon;
