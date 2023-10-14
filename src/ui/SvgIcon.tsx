import React from 'react';
import icons from '../assets/icons.svg';

type SvgIncomingData = {
  svgName: string;
  size: number;
  stroke: string;
  fill: string;
  className: string;
};

const SvgIcon = (svgData: Partial<SvgIncomingData>) => {
  const { svgName, size, stroke, fill = 'transparent' } = svgData;

  return (
    // <svg className={`stroke-${stroke} fill-${fill}`} width={size} height={size}>
    <svg
      stroke={stroke}
      fill={fill}
      width={size}
      height={size}
      className='group-hover:fill-whiteBase transition-colors'
    >
      <use href={icons + `#${svgName}`}></use>
    </svg>
  );
};

export default SvgIcon;
