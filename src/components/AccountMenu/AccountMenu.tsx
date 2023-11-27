import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useActiveLinks } from 'hooks';

import { CommonMenu } from 'ui';

interface MobileMenu {
  isOpen?: boolean;
  closeMenu?: () => void;
}

const AccountMenu: FC<MobileMenu> = ({ isOpen, closeMenu }) => {
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const links = [
    {
      path: '/account',
      label: 'Account',
      icon: 'icon-account',
      activeLink: activeLinks.isAccountPage,
    },
    {
      path: '/account-manage',
      label: 'Account settings',
      icon: 'icon-manage',
      activeLink: activeLinks.isManageAccountPage,
    },
  ];

  return (
    <CommonMenu isOpen={isOpen} links={links} navId='account-navigation' closeMenu={closeMenu} />
  );
};

export default AccountMenu;
