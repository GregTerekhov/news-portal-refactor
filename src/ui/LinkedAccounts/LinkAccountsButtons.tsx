import React, { FC } from 'react';

import { ButtonType, VariantButton } from 'types';
import { useWindowWidthContext } from 'contexts';

import { PrimaryButton } from '..';

import { useActiveLinks } from 'hooks';
import { useAccountSettings } from './hooks';
import {
  getAriaLabel,
  getButtonStyles,
  getButtonWrapperClass,
  getCallToActionText,
  getSvgSize,
} from './assistants';

const LinkAccountsButtons: FC = () => {
  const { isSmallScreens, isTV } = useWindowWidthContext();

  const { isManageAccountPage } = useActiveLinks();
  const { accountButtons } = useAccountSettings();

  const accountIconStyles =
    'fill-whiteBase group-hover:fill-accentAlt group-focus:fill-accentAlt dark:group-focus:fill-whiteBase dark:group-hover:fill-whiteBase';

  const wrapperClass = getButtonWrapperClass(isManageAccountPage, isSmallScreens, isTV);
  const buttonVariant =
    isManageAccountPage || isSmallScreens ? VariantButton.Small : VariantButton.Other;
  const iconSize = getSvgSize(isManageAccountPage, isSmallScreens, isTV);
  const buttonClass = getButtonStyles(isManageAccountPage);

  return (
    <ul
      className={`${
        isManageAccountPage ? 'space-y-3 md:space-y-4' : 'flex justify-evenly gap-4 md:gap-8'
      }`}
    >
      {Array.isArray(accountButtons) &&
        accountButtons.map(({ svgName, account, onClick, hasAccount }) => (
          <li
            key={account}
            className={isManageAccountPage ? 'flex items-center gap-3 lg:gap-6' : ''}
          >
            <div className={wrapperClass}>
              <PrimaryButton
                type={ButtonType.Submit}
                variant={buttonVariant}
                hasIcon={true}
                svgName={svgName}
                svgSize={iconSize}
                ariaLabel={getAriaLabel(account, isManageAccountPage, hasAccount)}
                classNameButton={buttonClass}
                classNameIcon={accountIconStyles}
                children={!isSmallScreens && !isManageAccountPage ? account : ''}
                onHandleClick={onClick}
              />
            </div>
            {isManageAccountPage ? (
              <p className='text-small leading-normal text-darkBase dark:text-whiteBase lg:text-medium hg:text-xl'>
                {getCallToActionText(hasAccount, account)}
              </p>
            ) : null}
          </li>
        ))}
    </ul>
  );
};

export default LinkAccountsButtons;
