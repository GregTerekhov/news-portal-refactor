import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useActiveLinks } from 'hooks';

import { CommonMenu } from 'ui';

interface MobileMenu {
  isOpen?: boolean;
  closeMenu?: () => void;
}

const Menu: FC<MobileMenu> = ({ isOpen, closeMenu }) => {
  const location = useLocation();
  const activeLinks = useActiveLinks(location);

  const links = [
    { path: '/', label: 'Home', icon: 'icon-home', activeLink: activeLinks.isHomeActive },
    {
      path: '/favourite',
      label: 'Favourite',
      icon: 'icon-heart-menu',
      activeLink: activeLinks.isFavoriteActive,
    },
    { path: '/read', label: 'Read', icon: 'icon-open-book', activeLink: activeLinks.isReadActive },
    {
      path: '/archive',
      label: 'Archive',
      icon: 'icon-archive',
      activeLink: activeLinks.isArchiveActive,
    },
  ];

  return <CommonMenu isOpen={isOpen} links={links} navId='main-navigation' closeMenu={closeMenu} />;
};

export default Menu;
