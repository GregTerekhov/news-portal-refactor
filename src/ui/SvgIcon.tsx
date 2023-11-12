import React from 'react';
import icons from 'assets/icons.svg';

interface SvgIncomingData {
  svgName?: string | undefined;
  size: number | undefined;
  className: string | undefined;
}

const SvgIcon = (svgData: Partial<SvgIncomingData>) => {
  const { svgName, size, className } = svgData;

  return (
    <svg
      width={size}
      height={size}
      className={`group-hover:fill-whiteBase transition-colors ${className}`}
    >
      <use href={icons + `#${svgName}`}></use>
    </svg>
  );
};

export default SvgIcon;
