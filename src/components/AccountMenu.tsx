import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useActiveLinks, useAuthCollector } from 'hooks';

import { PrimaryButton, SvgIcon } from 'ui';

interface MobileMenu {
  isOpen: boolean;
  closeMenu: () => void;
}

const AccountMenu = ({ isOpen, closeMenu }: Partial<MobileMenu>) => {
  const location = useLocation();
  const activeLinks = useActiveLinks(location);
  const { logout } = useAuthCollector();

  const handleLinkClick = () => {
    if (typeof closeMenu === 'function') {
      closeMenu();
    }
  };

  const handleSignOut = () => {
    logout();
    localStorage.clear();
  };

  const links = [
    {
      path: '/account',
      label: 'Account',
      icon: 'icon-account',
      activeLink: activeLinks.isAccountPage,
    },
    {
      path: '/accountManage',
      label: 'Manage your account',
      icon: 'icon-manage',
      activeLink: activeLinks.isManageAccountPage,
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className={`fixed top-0 z-40 pb-[18px] pt-[147px] before:fixed before:content-[""] before:z-[8] before:w-full before:h-[81px] before:top-0 before:left-0 w-screen h-screen bg-whiteBase dark:bg-darkBackground transition-all duration-500 ${
            isOpen ? 'left-0' : '-left-full'
          }`}
        >
          <div className='container mx-auto px-4 space-y-6'>
            <ul className='space-y-2 after:content-[""] after:w-full after:h-px after:bg-accentBase after:block after:mt-3'>
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={handleLinkClick}
                    className={`flex items-center py-1.5 font-medium md:font-bold text-medium lg:text-xl transition-colors duration-500 ${
                      link.activeLink
                        ? 'bg-accentBase text-whiteBase justify-between [clip-path:inset(0 -100vmax)]'
                        : 'text-darkBase dark:text-whiteBase'
                    }`}
                  >
                    <div className='flex items-center gap-3.5'>
                      <div
                        className={`bg-accentBase rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-500 ${
                          link.activeLink && 'outline outline-1 outline-whiteBase'
                        }`}
                      >
                        <SvgIcon svgName={link.icon} size={18} className='fill-whiteBase' />
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
                  </Link>
                </li>
              ))}
            </ul>
            <PrimaryButton
              id='Sign out button'
              classNameButton='border border-solid border-transparent dark:border-whiteBase'
              hasIcon={true}
              variant='OtherButton'
              width='w-32'
              svgName='icon-signout'
              svgSize={24}
              classNameIcon='fill-whiteBase'
              onHandleClick={handleSignOut}
            >
              Sign Out
            </PrimaryButton>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountMenu;
