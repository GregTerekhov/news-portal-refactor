import React, { FC } from 'react';

import { useDBRedux } from 'reduxStore/hooks';
import { useWindowWidthContext } from 'contexts';

import { SvgIcon } from 'ui';

const ClearLogButton: FC = () => {
  const { clearLog } = useDBRedux();
  const { isNotMobile } = useWindowWidthContext();

  return (
    <button
      type='submit'
      className='group flex items-center gap-x-4 text-accentBase transition-colors duration-500 hocus:text-accentAlt dark:text-whiteBase dark:hocus:text-accentBase max-md:absolute max-md:right-0 max-md:top-0 max-md:h-10 max-md:w-10 max-md:justify-center'
      onClick={clearLog}
    >
      {isNotMobile ? 'Clear log' : null}
      <SvgIcon
        svgName='trash'
        sizeKey='smIcon18'
        className='fill-accentBase group-hover:fill-accentAlt group-focus:fill-accentAlt dark:fill-whiteBase dark:group-hover:fill-accentBase dark:group-focus:fill-accentBase'
      />
    </button>
  );
};

export default ClearLogButton;
