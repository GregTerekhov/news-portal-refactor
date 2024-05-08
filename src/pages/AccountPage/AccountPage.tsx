import React, { FC } from 'react';

import { useAuthRedux } from 'reduxStore/hooks';
import { useWindowWidthContext } from 'contexts';

import { SvgIcon } from 'ui';

import { renderInfoItems, renderAccountIcons } from './assistants';

const AccountPage: FC<{}> = () => {
  const { user, haveAccounts } = useAuthRedux();
  const { isSmallScreens } = useWindowWidthContext();

  const userInfoList = renderInfoItems(user);
  const accountIcons = renderAccountIcons(haveAccounts);

  //Умови наявності прив'язаних акаунтів
  const haveLinkedAccount = haveAccounts.google || haveAccounts.facebook || haveAccounts.apple;

  const commonHeadlineClass = 'text-darkBase dark:text-whiteBase text-end';

  return (
    <div>
      <h2 className={`${commonHeadlineClass} mb-14 text-3xl leading-tighter hg:text-5xl`}>
        Your account
      </h2>
      <div className='flex flex-col items-end'>
        <ul className='mb-6 w-52 space-y-6 md:mb-10 md:w-80 md:space-y-10 lg:w-600px'>
          {Array.isArray(userInfoList) &&
            userInfoList.map(({ label, value }) => (
              <li key={label}>
                <h3 className={`${commonHeadlineClass} mb-2 md:text-2xl hg:text-3xl`}>{label}</h3>
                <p className='text-end text-accentBase dark:text-greyAlt md:text-medium hg:text-xl'>
                  {value}
                </p>
              </li>
            ))}
        </ul>
        {haveLinkedAccount && (
          <>
            <h3 className={`${commonHeadlineClass} mb-4 md:text-2xl hg:text-3xl`}>
              Connected accounts
            </h3>
            <ul className='flex items-center justify-end gap-x-4 md:gap-x-6'>
              {Array.isArray(accountIcons) &&
                accountIcons.map(({ iconName }) => (
                  <li
                    key={iconName}
                    className='rounded-[10px] border border-solid bg-accentBase p-2 dark:border-whiteBase'
                  >
                    <SvgIcon
                      svgName={iconName}
                      sizeKey={isSmallScreens ? 'smIcon20' : 'mdIcon24'}
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
