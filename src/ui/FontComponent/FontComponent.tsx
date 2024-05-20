import React, { FC } from 'react';

import { FontFaceRule } from './subcomponents';

import { fonts } from './assistants';

const FontComponent: FC = () => {
  return (
    <style>
      {`
        :root {
          font-family: 'Manrope', sans-serif; /* Основний шрифт за замовчуванням */
        }
      `}
      {Array.isArray(fonts) &&
        fonts.map(({ fontName, weight }) => (
          <FontFaceRule key={fontName} fontName={fontName} weight={weight} />
        ))}
    </style>
  );
};

export default FontComponent;
