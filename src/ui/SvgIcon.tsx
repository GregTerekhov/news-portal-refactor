import React from 'react';
import icons from '../assets/icons.svg';

type SvgIncomingData = {
  svgName: string;
  size: number;
  stroke: string;
  fill: string;
  clasName: string;
};

const SvgIcon = (svgData: Partial<SvgIncomingData>) => {
  const { svgName, size, stroke, fill = 'transparent' } = svgData; //Значения stroke и fill передавать ввиде класса tailwind, "stroke-*цвет*", "fill-*цвет*"

  return (
    // <svg className={`stroke-${stroke} fill-${fill}`} width={size} height={size}>
    <svg stroke={stroke} fill={fill} width={size} height={size}>
      <use href={icons + `#${svgName}`}></use>
    </svg>
  );
};

export default SvgIcon;
