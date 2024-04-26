import React, { FC } from 'react';

import { VariantButton } from 'types';
import { useWindowWidthContext } from 'contexts';

import { PrimaryButton } from 'ui';

import { useActiveLinks } from 'hooks';
import { useAccountSettings } from './hooks';
import { getAriaLabel, getButtonWrapperClass, getCallToActionText, getSvgSize } from './assistants';

const LinkAccountsButtons: FC = () => {
  const { isMobile, isTV } = useWindowWidthContext();

  const { isManageAccountPage } = useActiveLinks();
  const { accountButtons } = useAccountSettings();

  const accountButtonStyles = `w-14 h-14 ${
    isManageAccountPage ? 'lg:w-12 lg:h-12 hg:w-16 hg:h-16' : 'md:w-full'
  } rounded-xl border-whiteBase dark:border-greyBase bg-accentBase dark:bg-transparent group hocus:border-accentBase hocus:text-accentBase dark:hocus:text-whiteBase dark:hocus:border-whiteBase hocus:bg-whiteBase dark:hocus:bg-accentBase ring-whiteBase dark:ring-darkBase ring-2`;

  const accountIconStyles =
    'fill-whiteBase group-hover:fill-accentAlt group-focus:fill-accentAlt dark:group-focus:fill-whiteBase dark:group-hover:fill-whiteBase';

  return (
    <ul
      className={`${
        isManageAccountPage ? 'space-y-3 md:space-y-4' : 'flex justify-evenly gap-4 md:gap-8'
      }`}
    >
      {accountButtons.map(({ svgName, account, onClick, hasAccount }) => (
        <li
          key={account}
          className={`${isManageAccountPage ? 'flex items-center gap-3 lg:gap-6' : ''}`}
        >
          <div className={getButtonWrapperClass(isManageAccountPage, isMobile, isTV)}>
            <PrimaryButton
              type='submit'
              variant={isManageAccountPage || isMobile ? VariantButton.Small : VariantButton.Other}
              hasIcon={true}
              svgName={svgName}
              svgSize={getSvgSize(isManageAccountPage, isMobile, isTV)}
              ariaLabel={getAriaLabel(account, isManageAccountPage, hasAccount)}
              classNameButton={accountButtonStyles}
              classNameIcon={accountIconStyles}
              children={!isMobile && !isManageAccountPage ? account : ''}
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
