import React, { FC } from 'react';

import { fonts } from './assistants';
import { FontFaceRule } from './subcomponents';

const FontComponent: FC<{}> = () => {
  return (
    <style>
      {`
        :root {
          font-family: 'Manrope', sans-serif; /* Основний шрифт за замовчуванням */
        }
      `}
      {fonts.map(({ fontName, weight }) => (
        <FontFaceRule key={fontName} fontName={fontName} weight={weight} />
      ))}
    </style>
  );
};

export default FontComponent;
