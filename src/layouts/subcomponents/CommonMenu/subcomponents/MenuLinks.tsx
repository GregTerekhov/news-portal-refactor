import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { IconSizes } from 'types';

import { SvgIcon } from 'ui';

import { getMenuLinks } from '../assistants';

interface IMenuLinksProps {
  handleLinkClick?: (() => void) | undefined;
}

const MenuLinks: FC<Partial<IMenuLinksProps>> = ({ handleLinkClick }) => {
  const links = getMenuLinks();

  const menuLinksStyles =
    'flex items-center justify-between rounded-[20px] border border-solid border-transparent bg-accentBase px-4 text-whiteBase dark:border-whiteBase max-lg:py-2.5 lg:py-2 hocus:bg-accentAlt';

  return (
    <>
      {Array.isArray(links) &&
        links.map(({ id, iconName, path, label }) => (
          <Link
            key={iconName}
            to={path}
            id={id}
            className={menuLinksStyles}
            onClick={handleLinkClick}
          >
            {label}
            <SvgIcon
              svgName={iconName}
              sizeKey={IconSizes.smIcon20}
              className='fill-transparent stroke-whiteBase'
            />
          </Link>
        ))}
    </>
  );
};

export default MenuLinks;
