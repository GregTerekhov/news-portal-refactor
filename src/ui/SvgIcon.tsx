import React from 'react';
import icons from 'assets/icons.svg';

type SvgIncomingData = {
  svgName: string;
  size: number;
  className: string;
};

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
