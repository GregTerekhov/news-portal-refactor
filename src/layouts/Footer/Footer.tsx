import React, { FC } from 'react';

import { useAuthCollector } from 'hooks';

import ThemeSwitcher from 'components/ThemeSwitcher/ThemeSwitcher';
import { FooterMenu } from './subcomponents';

const Footer: FC<{}> = () => {
  const { isAuthenticated } = useAuthCollector();

  return (
    <footer className='bg-accentBase py-8'>
      <div className='container relative mx-auto px-4 hg:px-[65px]'>
        <div className={`relative ${isAuthenticated ? 'flex justify-between' : ''}`}>
          <FooterMenu />
          <div
            className={`absolute bottom-0 right-0 flex ${
              isAuthenticated ? 'items-end' : 'justify-end'
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
