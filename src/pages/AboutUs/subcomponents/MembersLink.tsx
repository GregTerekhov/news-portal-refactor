import React, { FC } from 'react';

import { MemberLinks } from 'types';

import { SvgIcon } from 'ui';

import { getMembersLink } from '../assistants';

const MembersLink: FC<MemberLinks> = ({ githubLink, linkedinLink, emailLink, telegramLink }) => {
  const linkClass =
    'w-14 h-14 lg:w-12 lg:h-12 hg:w-16 hg:h-16 rounded-xl border border-solid border-whiteBase dark:border-greyBase bg-accentBase dark:bg-transparent flex items-center justify-center group hocus:border-accentBase dark:hocus:border-whiteBase hocus:bg-whiteBase dark:hocus:bg-accentBase transition-colors ring-whiteBase dark:ring-darkBase ring-2';
  const iconClass =
    'fill-whiteBase group-hover:fill-accentAlt dark:group-hover:fill-whiteBase group-focus:fill-accentAlt dark:group-focus:fill-whiteBase';

  const links = getMembersLink(githubLink, linkedinLink, emailLink, telegramLink);

  return (
    <ul className='flex items-center justify-around hg:justify-between'>
      {Array.isArray(links) &&
        links.map(({ link, icon, iconSize }) => (
          <li key={link}>
            <a href={link} className={linkClass}>
              <SvgIcon svgName={icon} sizeKey={iconSize} className={iconClass} />
            </a>
          </li>
        ))}
    </ul>
  );
};

export default MembersLink;
