import React from 'react';
import icons from '../assets/icons.svg';

type SvgIncomingData = {
  svgName: string;
  size: number;
  stroke: string;
  fill: string;
};

const SvgIcon = (svgData: SvgIncomingData) => {
  const { svgName, size, stroke, fill } = svgData; //Значения stroke и fill передавать ввиде класса tailwind, "stroke-*цвет*", "fill-*цвет*"

  return (
    <svg className={`${stroke} ${fill}`} width={size} height={size}>
      <use href={icons + `#${svgName}`}></use>
    </svg>
  );
};

export default SvgIcon;
