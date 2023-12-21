import React, { FC } from 'react';

import { useAuthRedux } from 'reduxStore/hooks';

import { ThemeSwitcher } from 'ui';

import { FooterMenu } from './subcomponents';

const Footer: FC<{}> = () => {
  const { isAuthenticated } = useAuthRedux();
  // const isAuthenticated = true;
  return (
    <footer className='bg-accentBase py-8'>
      <div className='container relative mx-auto px-4 hg:px-[65px]'>
        <div className={`relative ${isAuthenticated ? 'flex justify-between' : ''}`}>
          <FooterMenu />
          <div
            className={`flex ${
              isAuthenticated ? 'items-end absolute bottom-0 right-0' : 'justify-end'
            }`}
          >
            <ThemeSwitcher variant='footer' />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
