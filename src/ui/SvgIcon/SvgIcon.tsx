import React, { FC } from 'react';

import { IconName, IconSizes } from 'types';

import { useCache } from 'hooks';

import icons from 'assets/icons.svg';

interface ISvgIncomingData {
  svgName?: IconName | undefined;
  sizeKey?: IconSizes | undefined;
  className?: string | undefined;
}

const SvgIcon: FC<ISvgIncomingData> = ({ svgName, sizeKey, className }) => {
  const { cacheIcon } = useCache();

  const size = sizeKey ?? '';
  const cachedIconName = cacheIcon(`icon-${svgName}` || '');

  return (
    <svg width={size} height={size} className={`transition-colors duration-500 ${className}`}>
      <use href={`${icons}#${cachedIconName}`}></use>
    </svg>
  );
};

export default SvgIcon;
