import React, { FC } from 'react';

import { useWindowWidthContext } from 'contexts';

import { SvgIcon } from 'ui';

interface ClearLogButtonProps {
  toggleModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ClearLogButton: FC<ClearLogButtonProps> = ({ toggleModal }) => {
  const { isNotMobile } = useWindowWidthContext();

  const buttonStyles =
    'group flex items-center gap-x-4 text-accentBase transition-colors duration-500 hocus:text-accentAlt dark:text-whiteBase dark:hocus:text-accentBase max-md:absolute max-md:right-0 max-md:top-0 max-md:h-10 max-md:w-10 max-md:justify-center';

  const iconStyles =
    'fill-accentBase group-hover:fill-accentAlt group-focus:fill-accentAlt dark:fill-whiteBase dark:group-hover:fill-accentBase dark:group-focus:fill-accentBase';

  return (
    <button type='button' className={buttonStyles} onClick={toggleModal}>
      {isNotMobile ? 'Clear log' : null}
      <SvgIcon svgName='trash' sizeKey='smIcon18' className={iconStyles} />
    </button>
  );
};

export default ClearLogButton;
