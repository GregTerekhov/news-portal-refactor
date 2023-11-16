import React, { useState } from 'react';

import { useWindowWidth } from 'hooks';

import { Input, PrimaryButton, SvgIcon } from 'ui';

const AccountPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget.name;
    const inputValue = event.currentTarget.value;

    switch (targetInput) {
      case 'email':
        setEmail(inputValue);
        break;
      case 'password':
        setPassword(inputValue);
        break;
      default:
        break;
    }
  };
  return (
    <div
      className={`${
        breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop
          ? 'flex justify-around'
          : ''
      }`}
    >
      {breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop ? (
        <SvgIcon svgName='icon-logo' size={160} className='fill-darkBase dark:fill-whiteBase' />
      ) : null}
      <div>
        <div className='flex items-center justify-end mb-6 md:mb-10'>
          <div className='space-y-6 md:space-y-10 w-52 md:w-80'>
            <div>
              <p className='text-darkBase dark:text-whiteBase mb-2 text-end md:text-2xl'>
                Account ID:
              </p>
              <p className='text-accentBase dark:text-greyAlt text-end md:text-medium'>
                3453451236246
              </p>
            </div>
            <Input
              inputData={{
                name: 'email',
                type: 'email',
                value: email,
                placeholder: 'Change your email',
              }}
              svgName='icon-envelop'
              className='fill-accentBase'
              hasIcon={true}
              variant='accountPage'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmailChange(event)}
            />
            <Input
              inputData={{
                name: 'password',
                type: 'password',
                value: password,
                placeholder: 'Change your password',
              }}
              svgName='icon-password'
              className='fill-accentBase'
              hasIcon={true}
              variant='accountPage'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmailChange(event)}
            />
            <div>
              <p className='text-darkBase dark:text-whiteBase mb-4 md:text-2xl text-end'>
                Connected accounts
              </p>
              <div className='flex items-center justify-end gap-4 md:gap-6'>
                <PrimaryButton
                  variant='Small'
                  hasIcon={true}
                  svgName='icon-google'
                  svgSize={
                    breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24
                  }
                  ariaLabel='Google account binding'
                  classNameButton='bg-accentBase dark:border-whiteBase py-2'
                  classNameIcon='fill-whiteBase'
                />
                <PrimaryButton
                  variant='Small'
                  hasIcon={true}
                  svgName='icon-facebook'
                  svgSize={
                    breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24
                  }
                  ariaLabel='Facebook account binding'
                  classNameButton='bg-accentBase dark:border-whiteBase py-2'
                  classNameIcon='fill-whiteBase'
                />
                <PrimaryButton
                  variant='Small'
                  hasIcon={true}
                  svgName='icon-apple'
                  svgSize={
                    breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile ? 20 : 24
                  }
                  ariaLabel='Apple account binding'
                  classNameButton='bg-accentBase dark:border-whiteBase py-2'
                  classNameIcon='fill-whiteBase'
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className='text-darkBase dark:text-whiteBase mb-4 md:text-2xl text-end'>
            Change your theme
          </p>
          <div className='flex flex-nowrap justify-center gap-5'>
            <div className='flex items-center justify-center rounded-full'>
              <Input
                inputData={{ id: 'light' }}
                variant='themeChanger'
                hasIcon={false}
                className='text-[#f4f4f4] focus:ring-[#f4f4f4] dark:focus:ring-[#f4f4f4] border-[#f4f4f4] dark:ring-offset-[#f4f4f4]'
              />
            </div>
            <div className='flex items-center justify-center rounded-full'>
              <Input
                inputData={{ id: 'dark' }}
                variant='themeChanger'
                hasIcon={false}
                className='text-[#2e2e2e] focus:ring-[#2e2e2e] dark:focus:ring-[#2e2e2e] border-[#2e2e2e]'
              />
            </div>
            <div className='flex items-center justify-center rounded-full'>
              <Input
                inputData={{ id: 'sweetPink' }}
                variant='themeChanger'
                hasIcon={false}
                className='text-[#fca5a5] focus:ring-[#fca5a5] dark:focus:ring-[#fca5a5] border-[#fca5a5]'
              />
            </div>
            <div className='flex items-center justify-center rounded-full'>
              <Input
                inputData={{ id: 'macaroniAndCheese' }}
                variant='themeChanger'
                hasIcon={false}
                className='text-[#fdba74] focus:ring-[#fdba74] dark:focus:ring-[#fdba74] border-[#fdba74]'
              />
            </div>
            <div className='flex items-center justify-center rounded-full'>
              <Input
                inputData={{ id: 'iceCold' }}
                variant='themeChanger'
                hasIcon={false}
                className='text-[#bbf7d0] focus:ring-[#bbf7d0] dark:focus:ring-[#bbf7d0] border-[#bbf7d0]'
              />
            </div>
            <div className='flex items-center justify-center rounded-full'>
              <Input
                inputData={{ id: 'blueChill' }}
                variant='themeChanger'
                hasIcon={false}
                className='text-[#0d9488] focus:ring-[#0d9488] dark:focus:ring-[#0d9488] border-[#0d9488]'
              />
            </div>
            <div className='flex items-center justify-center rounded-full'>
              <Input
                inputData={{ id: 'lochmara' }}
                variant='themeChanger'
                hasIcon={false}
                className='text-[#0284c7] focus:ring-[#0284c7] dark:focus:ring-[#0284c7] border-[#0284c7]'
              />
            </div>
            <div className='flex items-center justify-center rounded-full'>
              <Input
                inputData={{ id: 'mauve' }}
                variant='themeChanger'
                hasIcon={false}
                className='text-[#d8b4fe] focus:ring-[#d8b4fe] dark:focus:ring-[#d8b4fe] border-[#d8b4fe]'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
