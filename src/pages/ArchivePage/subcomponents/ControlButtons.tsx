import React, { FC } from 'react';

import { useDBRedux } from 'reduxStore/hooks';
import { useWindowWidthContext } from 'contexts';

import { SvgIcon } from 'ui';

interface ButtonsData {
  type: 'submit' | 'reset' | 'button' | undefined;
  iconName: string;
  label: string;
}

const ControlButtons: FC<{ toggleModal: (e: React.MouseEvent<HTMLButtonElement>) => void }> = ({
  toggleModal,
}) => {
  const { getHistoryLog } = useDBRedux();
  const { isNotMobile } = useWindowWidthContext();

  const buttonStyles =
    'group flex items-center gap-x-4 text-accentBase transition-colors duration-500 hocus:text-accentAlt dark:text-whiteBase dark:hocus:text-accentBase max-md:absolute max-md:top-0 max-md:h-10 max-md:w-10 max-md:justify-center';

  const iconStyles =
    'fill-accentBase group-hover:fill-accentAlt group-focus:fill-accentAlt dark:fill-whiteBase dark:group-hover:fill-accentBase dark:group-focus:fill-accentBase';

  const buttonData: ButtonsData[] = [
    { type: 'submit', iconName: 'reset', label: 'Update log' },
    {
      type: 'button',
      iconName: 'trash',
      label: 'Clear log',
    },
  ];

  return (
    <>
      {Array.isArray(buttonData) &&
        buttonData.map(({ type, iconName, label }) => (
          <React.Fragment key={iconName}>
            <button
              type={type}
              onClick={type === 'button' ? toggleModal : getHistoryLog}
              className={`${buttonStyles} ${iconName === 'reset' ? 'max-md:right-12' : 'max-md:right-0'}`}
            >
              {isNotMobile ? label : null}
              <SvgIcon svgName={iconName} sizeKey='smIcon18' className={iconStyles} />
            </button>
          </React.Fragment>
        ))}
    </>
  );
};

export default ControlButtons;
