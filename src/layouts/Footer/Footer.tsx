import React, { FC } from 'react';

import { useAuthRedux } from 'reduxStore/hooks';

import { VariantSwitcher } from 'types';

import { ThemeSwitcher } from 'ui';

import { FooterMenu, SocialLinks } from './subcomponents';

const Footer: FC<{}> = () => {
  const { isAuthenticated } = useAuthRedux();

  return (
    <footer className='bg-accentBase py-8'>
      <div className='container relative mx-auto px-4 hg:px-[65px]'>
        <div className={`${isAuthenticated ? 'md:flex md:justify-between' : ''}`}>
          <div className={`${isAuthenticated ? 'space-y-3' : ''}`}>
            <div className={`${isAuthenticated ? '' : 'hidden'}`}>
              <h2 className='text-medium text-whiteBase md:text-xl'>Menu</h2>
              <hr />
            </div>
            <FooterMenu />
          </div>
          <div
            className={`${
              isAuthenticated ? 'md:flex-col' : 'flex-row'
            } flex items-end justify-between`}
          >
            <div className='space-y-3'>
              <div>
                <h2 className='text-medium text-whiteBase md:text-xl'>NYTimes social links</h2>
                <hr />
              </div>
              <SocialLinks />
            </div>
            <ThemeSwitcher variant={VariantSwitcher.Footer} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
