import React, { FC } from 'react';

import { useDBRedux } from 'reduxStore/hooks';
import { useWindowWidthContext } from 'contexts';

import { SvgIcon } from 'ui';
import { getButtonsData, getButtonStyles, getIconStyles } from '../assistants';

const ControlButtons: FC<{ toggleModal: (e: React.MouseEvent<HTMLButtonElement>) => void }> = ({
  toggleModal,
}) => {
  const { getHistoryLog, dbSuccessMessage, archiveHistoryLog } = useDBRedux();
  const { isNotMobile } = useWindowWidthContext();

  const isDisabledUpdateButton = dbSuccessMessage !== 'Remove news success';
  const isDisabledClearButton = archiveHistoryLog?.length === 0;

  const buttonData = getButtonsData(isDisabledUpdateButton, isDisabledClearButton);

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
