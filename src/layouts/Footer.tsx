import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useActiveLinks, useAuthCollector } from 'hooks';

import { SvgIcon } from 'ui';
import ThemeSwitcher from 'components/ThemeSwitcher';

const Footer: FC<{}> = () => {
  const { isAuthenticated } = useAuthCollector();
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  return (
    <footer className='bg-accentBase py-8'>
      <div className='container relative mx-auto px-4'>
        {!isAuthenticated ? (
          <div className=''>
            <nav className='mb-4'>
              <ul className='flex justify-between items-center'>
                <li>
                  <Link
                    to='/'
                    className='flex items-center gap-x-2 border border-solid border-whiteBase rounded-xl p-2 text-medium font-medium text-whiteBase'
                  >
                    <SvgIcon
                      svgName='icon-home'
                      size={20}
                      className='stroke-whiteBase fill-transparent'
                    />
                    Home
                  </Link>
                </li>
                <li>
                  {!activeLinks.isAboutUs ? (
                    <Link
                      to='/about-us'
                      className='border border-solid border-whiteBase rounded-xl p-2 text-medium font-medium text-whiteBase'
                    >
                      About us
                    </Link>
                  ) : null}
                </li>
              </ul>
            </nav>
            <div className='flex justify-end'>
              <ThemeSwitcher variant='footer' />
            </div>
          </div>
        ) : (
          <div className='flex justify-between'>
            <nav>
              <ul className='grid grid-cols-2 grid-rows-4 gap-3 justify-between'>
                <li className='row-start-1 col-start-1'>
                  <Link to='/' className='p-2 text-medium font-medium text-whiteBase'>
                    Home
                  </Link>
                </li>
                <li className='row-start-2 col-start-1'>
                  <Link to='/favourite' className='p-2 text-medium font-medium text-whiteBase'>
                    Favourite
                  </Link>
                </li>
                <li className='row-start-3 col-start-1'>
                  <Link to='/read' className='p-2 text-medium font-medium text-whiteBase'>
                    Read
                  </Link>
                </li>
                <li className='row-start-4 col-start-1'>
                  <Link to='/archive' className='p-2 text-medium font-medium text-whiteBase'>
                    Archive
                  </Link>
                </li>
                <li className='row-start-1 col-start-2'>
                  <Link to='/account' className='p-2 text-medium font-medium text-whiteBase'>
                    Account
                  </Link>
                </li>
                {!activeLinks.isAboutUs ? (
                  <li className='row-start-2 col-start-2'>
                    <Link
                      to='/about-us'
                      className='col-start-2 row-start-1 p-2 text-medium font-medium text-whiteBase'
                    >
                      About us
                    </Link>
                  </li>
                ) : null}
              </ul>
            </nav>
            <div className='flex items-end'>
              <ThemeSwitcher variant='footer' />
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
