import React, { FC } from 'react';

import { useDBRedux } from 'reduxStore/hooks';
import { useWindowWidthContext } from 'contexts';

import { SvgIcon } from 'ui';
import { getButtonsData } from '../assistants';

const ControlButtons: FC<{ toggleModal: (e: React.MouseEvent<HTMLButtonElement>) => void }> = ({
  toggleModal,
}) => {
  const { getHistoryLog, dbSuccessMessage } = useDBRedux();
  const { isNotMobile } = useWindowWidthContext();

  const getButtonStyles = (iconName: string, disabled: boolean | undefined) => {
    return `${disabled ? 'text-greyAlt dark:text-greyBase' : 'text-accentBase hocus:text-accentAlt dark:text-whiteBase dark:hocus:text-accentBase'} ${iconName === 'reset' ? 'max-md:right-12' : 'max-md:right-0'} group flex items-center gap-x-4 transition-colors duration-500 max-md:absolute max-md:top-0 max-md:h-10 max-md:w-10 max-md:justify-center`;
  };

  const getIconStyles = (disabled: boolean | undefined) => {
    return `${disabled ? 'fill-greyAlt dark:fill-greyBase' : 'fill-accentBase group-hover:fill-accentAlt group-focus:fill-accentAlt dark:fill-whiteBase dark:group-hover:fill-accentBase dark:group-focus:fill-accentBase'}`;
  };

  const isDisabledButton = dbSuccessMessage !== 'Remove news success';

  const buttonData = getButtonsData(isDisabledButton);

  return (
    <>
      {Array.isArray(buttonData) &&
        buttonData.map(({ type, iconName, label, disabled }) => (
          <React.Fragment key={iconName}>
            <button
              type={type}
              disabled={disabled}
              onClick={type === 'button' ? toggleModal : getHistoryLog}
              className={getButtonStyles(iconName, disabled)}
            >
              {isNotMobile ? label : null}
              <SvgIcon svgName={iconName} sizeKey='smIcon18' className={getIconStyles(disabled)} />
            </button>
          </React.Fragment>
        ))}
    </>
  );
};

export default ControlButtons;
