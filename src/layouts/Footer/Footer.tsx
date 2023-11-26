import React, { FC } from 'react';

import { useAuthCollector } from 'hooks';

import ThemeSwitcher from 'components/ThemeSwitcher';
import { FooterMenu } from './subcomponents';

const Footer: FC<{}> = () => {
  const { isAuthenticated } = useAuthCollector();

  return (
    <footer className='bg-accentBase py-8'>
      <div className='container relative mx-auto px-4'>
        <div className={`${isAuthenticated ? 'flex justify-between' : ''}`}>
          <FooterMenu />
          <div className={`${isAuthenticated ? 'flex items-end' : 'justify-end'}`}>
            <ThemeSwitcher variant='footer' />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
