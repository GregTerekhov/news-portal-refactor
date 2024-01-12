import React, { FC } from 'react';

import { useAuthRedux } from 'reduxStore/hooks';

import { useWindowWidth } from 'contexts';

import { SvgIcon } from 'ui';

import { renderInfoItems, renderAccountIcons } from './assistants';

const AccountPage: FC<{}> = () => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };
  const { user, haveAccounts } = useAuthRedux();

  const userInfoList = renderInfoItems(user);
  const accountIcons = renderAccountIcons();
  const isMobile = breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile;
  const commonHeadlineClass = 'text-darkBase dark:text-whiteBase text-end';
  const haveLinkedAccount = haveAccounts.google || haveAccounts.facebook || haveAccounts.apple;

  return (
    <div>
      <h2 className={`${commonHeadlineClass} text-3xl leading-tighter mb-14`}>Your account</h2>
      <div className='flex flex-col items-end'>
        <ul className='space-y-6 md:space-y-10 w-52 md:w-80 lg:w-[600px] mb-6'>
          {userInfoList.map(({ label, value }) => (
            <li key={label}>
              <h3 className={`${commonHeadlineClass} mb-2 md:text-2xl`}>{label}</h3>
              <p className='text-accentBase dark:text-greyAlt text-end md:text-medium'>{value}</p>
            </li>
          ))}
        </ul>
        {haveLinkedAccount && (
          <>
            <h3 className={`${commonHeadlineClass} mb-4 md:text-2xl`}>Connected accounts</h3>
            <ul className='flex items-center justify-end gap-x-4 md:gap-x-6'>
              {accountIcons.map(({ iconName }) => (
                <li
                  key={iconName}
                  className='border border-solid rounded-[10px] bg-accentBase dark:border-whiteBase p-2'
                >
                  <SvgIcon
                    svgName={iconName}
                    size={isMobile ? 20 : 24}
                    className='fill-whiteBase'
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
