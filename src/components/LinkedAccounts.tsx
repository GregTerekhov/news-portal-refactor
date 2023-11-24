import React, { FC } from 'react';

import { useActiveLinks, useWindowWidth } from 'hooks';

import { PrimaryButton } from 'ui';
import { useLocation } from 'react-router-dom';

const LinkedAccounts: FC = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const hasConnectedAccount = false;

  const accountButtons = [
    {
      svgName: 'icon-google',
      account: 'Google',
      dataTooltipTarget: 'tooltip-Google',
    },
    {
      svgName: 'icon-facebook',
      account: 'Facebook',
      dataTooltipTarget: 'tooltip-Facebook',
    },
    {
      svgName: 'icon-apple',
      account: 'Apple',
      dataTooltipTarget: 'tooltip-Apple',
    },
  ];

  return (
    <>
      {activeLinks.isManageAccountPage ? (
        <>
          <h3 className='text-darkBase dark:text-whiteBase mb-2 lg:mb-4 md:text-2xl'>
            Connected accounts
          </h3>
          <p className='text-darkBase text-small lg:text-medium leading-normal dark:text-whiteBase after:content=[""] after:block after:mt-3 after:w-full after:h-px after:bg-greyAlt after:dark:bg-whiteBase mb-2 md:mb-4'>
            Connect your News account to Google, Facebook, or Apple to log in using this account. We
            will never send messages to your contacts without your permission.
          </p>
        </>
      ) : null}
      <ul
        className={`${
          activeLinks.isManageAccountPage
            ? 'space-y-3 md:space-y-4'
            : 'flex justify-around md:gap-8 max-md:mb-8'
        }`}
      >
        {accountButtons.map(({ svgName, account, dataTooltipTarget }) => (
          <li
            key={svgName}
            className={`${
              activeLinks.isManageAccountPage ? 'flex items-center gap-3 lg:gap-6' : ''
            }`}
          >
            <div className='w-10'>
              <PrimaryButton
                variant='Small'
                hasIcon={true}
                svgName={svgName}
                svgSize={
                  breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24
                }
                ariaLabel={`${account} account binding`}
                dataTooltipPlacement='bottom'
                dataTooltipTarget={dataTooltipTarget}
                tooltipText={`Bind your ${account} account`}
                classNameButton='bg-accentBase hover:bg-accentAlt dark:border-whiteBase py-2'
                classNameIcon='fill-whiteBase'
              />
            </div>
            {activeLinks.isManageAccountPage ? (
              <p className='text-darkBase text-small lg:text-medium dark:text-whiteBase leading-normal'>
                {`${
                  hasConnectedAccount
                    ? `Disconnect your ${account} account from News. You will no longer be able to use it to log in.`
                    : `Connect your ${account} account to login to News.`
                }`}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
};

export default LinkedAccounts;
