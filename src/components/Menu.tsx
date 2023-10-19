import React, { useEffect, useMemo } from 'react';
import { useWindowWidth } from 'hooks';
import { createPortal } from 'react-dom';
import { NavLink, useLocation } from 'react-router-dom';
import { SvgIcon } from 'ui';
import { ThemeSwitcher } from 'components';

type MobileMenu = {
  isOpen: boolean;
};

const modalRoot = document.querySelector('#modalRoot');

const Menu = ({ isOpen }: Partial<MobileMenu>) => {
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

  const location = useLocation();

  const activeLinks = useMemo(
    () => ({
      isHomeActive: location.pathname === '/',
      isFavoriteActive: location.pathname === '/favourite',
      isReadActive: location.pathname === '/read',
    }),
    [location.pathname],
  );

  useEffect(() => {
    if (!modalRoot) {
      return;
    }
  }, []);

  const links = [
    { path: '/', label: 'Home', icon: 'icon-home', activeLink: activeLinks.isHomeActive },
    {
      path: '/favourite',
      label: 'Favourite',
      icon: 'icon-heart-menu',
      activeLink: activeLinks.isFavoriteActive,
    },
    { path: '/read', label: 'Read', icon: 'icon-open-book', activeLink: activeLinks.isReadActive },
  ];

  const shouldRenderPortal = breakpointsForMarkup?.isNothing || breakpointsForMarkup?.isMobile;

  return (
    <>
      {shouldRenderPortal ? (
        modalRoot &&
        createPortal(
          <div
            className={`fixed top-0 w-full h-full pb-[18px] pt-[147px] z-10 overflow-auto transition-left duration-500 bg-whiteBase before:fixed before:content-[""] before:z-[8] before:h-[81px] before:top-0 before:left-0 ${
              isOpen ? 'left-0' : '-left-full'
            }`}
          >
            <div className='container mx-auto px-4 flex flex-col justify-between h-full'>
              <ul className='flex flex-col gap-3'>
                {links.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      className={`flex items-center py-1.5 font-medium md:font-bold text-medium lg:text-xl ${
                        link.activeLink && 'bg-accentBase text-whiteBase justify-between'
                      }`}
                    >
                      <div className='flex items-center gap-3.5'>
                        <div
                          className={`bg-accentBase rounded-full w-8 h-8 flex items-center justify-center ${
                            link.activeLink && 'outline outline-1 outline-whiteBase'
                          }`}
                        >
                          <SvgIcon
                            svgName={link.icon}
                            size={18}
                            className='stroke-whiteBase fill-transparent'
                          />
                        </div>
                        {link.label}
                      </div>
                      {link.activeLink && (
                        <SvgIcon
                          svgName='icon-arrow-right'
                          size={24}
                          className='stroke-whiteBase fill-transparent'
                        />
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <ThemeSwitcher />
            </div>
          </div>,
          modalRoot,
        )
      ) : (
        <ul className='flex gap-11 lg:gap-[69px]'>
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={`relative pt-12 pb-8 lg:pt-[55px] lg:pb-[33px] hover:text-accentBase font-medium md:font-bold text-medium lg:text-xl md:text-medium lg:text-xl ${
                  link.activeLink
                    ? 'text-accentBase after:content[""] after:block after:absolute after:h-px after:w-full after:bg-accentBase'
                    : ''
                }`}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Menu;
