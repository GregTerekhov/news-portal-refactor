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
        <div className={`${isAuthenticated ? 'mb-4' : 'hidden'}`}>
          <h2 className='text-center text-medium text-whiteBase md:text-3xl'>Menu</h2>
          <hr className='mt-2' />
        </div>
        <FooterMenu />
        <div className='flex items-end justify-between'>
          <div className='space-y-3 hg:space-y-4'>
            <div>
              <h2 className='text-medium text-whiteBase md:text-xl hg:text-2xl'>
                NYTimes social links
              </h2>
              <hr />
            </div>
            <SocialLinks />
          </div>
          <ThemeSwitcher variant={VariantSwitcher.Footer} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
