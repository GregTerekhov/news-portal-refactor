import React, { FC } from 'react';

import { SvgIcon } from 'ui';

interface IMembersLinkProps {
  githubLink: string;
  linkedinLink: string;
  emailLink: string;
  telegramLink: string;
}

interface ILink {
  link: string;
  icon: string;
  iconSize: number;
}

const MembersLink: FC<IMembersLinkProps> = ({
  githubLink,
  linkedinLink,
  emailLink,
  telegramLink,
}) => {
  const linkClass =
    'w-14 h-14 lg:w-12 lg:h-12 rounded-xl border border-solid border-whiteBase dark:border-greyBase bg-accentBase dark:bg-transparent flex items-center justify-center group hover:border-accentBase dark:hover:border-whiteBase hover:bg-whiteBase dark:hover:bg-accentBase transition-colors duration-500 ring-whiteBase dark:ring-darkBase ring-2';
  const iconClass =
    'fill-whiteBase group-hover:fill-accentAlt dark:group-hover:fill-whiteBase transition-colors duration-500';

  const links: ILink[] = [
    {
      link: githubLink,
      icon: 'icon-github',
      iconSize: 28,
    },
    {
      link: linkedinLink,
      icon: 'icon-linkedin',
      iconSize: 28,
    },
    {
      link: emailLink,
      icon: 'icon-gmail',
      iconSize: 30,
    },
    {
      link: telegramLink,
      icon: 'icon-telegram',
      iconSize: 28,
    },
  ];

  return (
    <ul className='flex items-center justify-around'>
      {Array.isArray(links) &&
        links.map(({ link, icon, iconSize }) => (
          <li key={link}>
            <a href={link} className={linkClass}>
              <SvgIcon svgName={icon} size={iconSize} className={iconClass} />
            </a>
          </li>
        ))}
    </ul>
  );
};

export default MembersLink;
