import React, { FC } from 'react';

import icons from 'assets/icons.svg';

interface SvgIncomingData {
  svgName?: string | undefined;
  size: number | undefined;
  className: string | undefined;
}

const SvgIcon: FC<SvgIncomingData> = (svgData) => {
  const { svgName, size, className } = svgData;

  return (
    <svg width={size} height={size} className={`transition-colors duration-500 ${className}`}>
      <use href={icons + `#${svgName}`}></use>
    </svg>
  );
};

export default SvgIcon;
