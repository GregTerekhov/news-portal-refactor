import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { SvgIcon } from 'ui';

type MobileMenuLinks = {
  id: string;
  iconName: string;
  path: string;
  label: string;
};

interface MenuLinksProps {
  handleLinkClick?: (() => void) | undefined;
}

const MenuLinks: FC<Partial<MenuLinksProps>> = ({ handleLinkClick }) => {
  const links: MobileMenuLinks[] = [
    {
      id: 'Go home',
      iconName: 'home',
      path: '/',
      label: 'Home',
    },
    {
      id: 'Go to Favourite Page',
      iconName: 'heart',
      path: '/favourite',
      label: 'Favourite',
    },
    {
      id: 'Go to Read Page',
      iconName: 'open-book',
      path: '/read',
      label: 'Read',
    },
    {
      id: 'Go to Archive Page',
      iconName: 'archive',
      path: '/archive',
      label: 'Archive',
    },
  ];

  const menuLinksStyles =
    'flex items-center justify-between rounded-[20px] border border-solid border-transparent bg-accentBase px-4 text-whiteBase dark:border-whiteBase max-lg:py-2.5 lg:py-2 hover:bg-accentAlt';

  return (
    <>
      {links.map(({ id, iconName, path, label }) => (
        <Link
          key={iconName}
          to={path}
          id={id}
          className={`${menuLinksStyles}`}
          onClick={handleLinkClick}
        >
          {label}
          <SvgIcon
            svgName={iconName}
            sizeKey='smIcon20'
            className='fill-transparent stroke-whiteBase'
          />
        </Link>
      ))}
    </>
  );
};

export default MenuLinks;
