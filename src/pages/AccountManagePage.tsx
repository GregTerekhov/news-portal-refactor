import React, { FC, useState } from 'react';

import { useWindowWidth } from 'hooks';

import { Accordeon } from 'components';
import { Input, PrimaryButton } from 'ui';

const AccountManagePage: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
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
      case 'newPassword':
        setPassword(inputValue);
        break;
      case 'confirmPassword':
        setConfirmPassword(inputValue);
        break;
      default:
        break;
    }
  };

  const hasConnectedAccount = true;
  return (
    <div>
      <h2 className='text-darkBase dark:text-whiteBase text-2xl leading-tighter text-end mb-14'>
        Account settings
      </h2>
      <div className='flex items-center justify-end mb-2 md:mb-10'>
        <div className='space-y-2 md:space-y-10 w-52 md:w-80'>
          <Accordeon position='accountManagePage' filtersBlock='Change your email'>
            <form className='pt-4'>
              <Input
                inputData={{
                  name: 'email',
                  type: 'email',
                  value: email,
                  placeholder: 'Enter new email',
                }}
                svgName='icon-envelop'
                className='fill-accentBase'
                hasIcon={true}
                variant='accountPage'
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmailChange(event)}
              />
            </form>
            <p className='pt-3 text-darkBase text-small dark:text-whiteBase'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, quam!
            </p>
          </Accordeon>
          <Accordeon position='accountManagePage' filtersBlock='Change your password'>
            <form className='pt-4 space-y-4'>
              <Input
                inputData={{
                  name: 'newPassword',
                  type: 'password',
                  value: password,
                  placeholder: 'Enter new password',
                }}
                svgName='icon-password'
                className='fill-accentBase'
                hasIcon={true}
                variant='accountPage'
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmailChange(event)}
              />
              <Input
                inputData={{
                  name: 'confirmPassword',
                  type: 'password',
                  value: confirmPassword,
                  placeholder: 'Confirm new password',
                }}
                svgName='icon-password'
                className='fill-accentBase'
                hasIcon={true}
                variant='accountPage'
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmailChange(event)}
              />
            </form>
            <p className='pt-3 text-darkBase text-small dark:text-whiteBase'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, quam!
            </p>
          </Accordeon>
          <div>
            <h3 className='text-darkBase dark:text-whiteBase mb-2 md:text-2xl'>
              Connected accounts
            </h3>
            <p className='text-darkBase text-xs dark:text-whiteBase after:content=[""] after:block after:mt-3 after:w-full after:h-px after:bg-greyAlt after:dark:bg-whiteBase mb-2'>
              Connect your News account to Google, Facebook, or Apple to log in using this account.
              We will never send messages to your contacts without your permission. Visit our help
              topics to learn more.
            </p>
            <ul className='space-y-2'>
              <li>
                <div className='float-left mr-3'>
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
                </div>
                <p className='text-darkBase text-xs dark:text-whiteBase'>
                  {`${
                    hasConnectedAccount
                      ? 'Disconnect your Google account from News. You will no longer be able to use it to log in.'
                      : 'Connect your Google account to login to News.'
                  }`}
                </p>
              </li>
              <li>
                <div className='float-left mr-3'>
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
                </div>
                <p className='text-darkBase text-xs dark:text-whiteBase'>
                  {`${
                    hasConnectedAccount
                      ? 'Disconnect your Facebook account from News. You will no longer be able to use it to log in.'
                      : 'Connect your Facebook account to login to News.'
                  }`}
                </p>
              </li>
              <li>
                <div className='float-left mr-3'>
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
                <p className='text-darkBase text-xs dark:text-whiteBase'>
                  {`${
                    hasConnectedAccount
                      ? 'Disconnect your Apple account from News. You will no longer be able to use it to log in.'
                      : 'Connect your Apple account to login to News.'
                  }`}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagePage;
