import React, { FC } from 'react';

import { SvgIcon } from 'ui';

interface IMembersLinkProps {
  githubLink: string;
  linkedinLink: string;
  emailLink: string;
  telegramLink: string;
}

const MembersLink: FC<IMembersLinkProps> = ({
  githubLink,
  linkedinLink,
  emailLink,
  telegramLink,
}) => {
  return (
    <div className='flex items-center justify-around'>
      <a
        href={githubLink}
        className='w-14 h-14 lg:w-12 lg:h-12 rounded-xl border border-solid border-whiteBase dark:border-greyBase bg-accentBase dark:bg-transparent flex items-center justify-center group hover:border-accentBase dark:hover:border-whiteBase hover:bg-whiteBase dark:hover:bg-accentBase transition-colors duration-500 ring-whiteBase dark:ring-darkBase ring-2'
      >
        <SvgIcon
          svgName='icon-github'
          size={28}
          className='fill-whiteBase group-hover:fill-accentAlt dark:group-hover:fill-whiteBase'
        />
      </a>
      <a
        href={linkedinLink}
        className='w-14 h-14 lg:w-12 lg:h-12 rounded-xl border border-solid border-whiteBase dark:border-greyBase bg-accentBase dark:bg-transparent flex items-center justify-center group hover:border-accentBase dark:hover:border-whiteBase hover:bg-whiteBase dark:hover:bg-accentBase transition-colors duration-500 ring-whiteBase dark:ring-darkBase ring-2'
      >
        <SvgIcon
          svgName='icon-linkedin'
          size={28}
          className='fill-whiteBase group-hover:fill-accentAlt dark:group-hover:fill-whiteBase'
        />
      </a>
      <a
        href={emailLink}
        className='w-14 h-14 lg:w-12 lg:h-12 rounded-xl border border-solid border-whiteBase dark:border-greyBase bg-accentBase dark:bg-transparent flex items-center justify-center group hover:border-accentBase dark:hover:border-whiteBase hover:bg-whiteBase dark:hover:bg-accentBase transition-colors duration-500 ring-whiteBase dark:ring-darkBase ring-2'
      >
        <SvgIcon
          svgName='icon-gmail'
          size={30}
          className='fill-whiteBase group-hover:fill-accentAlt dark:group-hover:fill-whiteBase'
        />
      </a>
      <a
        href={telegramLink}
        className='w-14 h-14 lg:w-12 lg:h-12 rounded-xl border border-solid border-whiteBase dark:border-greyBase bg-accentBase dark:bg-transparent flex items-center justify-center group hover:border-accentBase dark:hover:border-whiteBase hover:bg-whiteBase dark:hover:bg-accentBase transition-colors duration-500 ring-whiteBase dark:ring-darkBase ring-2'
      >
        <SvgIcon
          svgName='icon-telegram'
          size={28}
          className='fill-whiteBase group-hover:fill-accentAlt dark:group-hover:fill-whiteBase'
        />
      </a>
    </div>
  );
};

export default MembersLink;
