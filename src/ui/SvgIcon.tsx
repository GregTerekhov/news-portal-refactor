import React from 'react';
import icons from '../assets/icons.svg';

type SvgIncomingData = {
  svgName: string;
  size: string | number;
  stroke: string | null;
  fill: string;
};

const SvgIcon = (svgData: SvgIncomingData) => {
  const { svgName, size = '14px', stroke = 'none', fill = 'none' } = svgData;

  console.log(icons);

  return (
    <svg width={size} height={size} stroke={stroke} fill={fill}>
      <use href={icons + `#${svgName}`}></use>
    </svg>
  );
};

export default SvgIcon;
