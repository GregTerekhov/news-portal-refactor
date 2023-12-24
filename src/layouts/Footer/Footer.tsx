import React, { FC } from 'react';

import { useAuthRedux } from 'reduxStore/hooks';

import { ThemeSwitcher } from 'ui';

import { FooterMenu, SocialLinks } from './subcomponents';

const Footer: FC<{}> = () => {
  const { isAuthenticated } = useAuthRedux();

  return (
    <footer className='bg-accentBase py-8'>
      <div className='container relative mx-auto px-4 hg:px-[65px]'>
        <div className='md:flex md:justify-between'>
          <div className={`${isAuthenticated ? 'space-y-3' : ''}`}>
            <div className={`${isAuthenticated ? '' : 'hidden'}`}>
              <h2 className='text-medium md:text-xl text-whiteBase'>Menu</h2>
              <hr />
            </div>
            <FooterMenu />
          </div>
          <div className='flex md:flex-col justify-between max-md:items-end'>
            <div className='space-y-3'>
              <div className={`${isAuthenticated ? '' : 'hidden'}`}>
                <h2 className='text-medium md:text-xl text-whiteBase'>NYTimes social links</h2>
                <hr />
              </div>
              <SocialLinks />
            </div>
            <ThemeSwitcher variant='footer' />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
