import React, { FC } from 'react';

import { useWindowWidthContext } from 'contexts';

import { SvgIcon } from 'ui';

import { renderSocialLinks } from '../assistants';

const SocialLinks: FC = () => {
  const { isWideScreens } = useWindowWidthContext();

  const socialLinks = renderSocialLinks(isWideScreens);

  return (
    <ul className='flex items-center justify-center gap-x-3 hg:gap-x-4'>
      {Array.isArray(socialLinks) &&
        socialLinks.map(({ label, link, iconName, size }) => (
          <li key={label}>
            <a href={link} aria-label={`${label} NYTimes button link`}>
              <SvgIcon svgName={iconName} sizeKey={size} className='fill-whiteBase' />
            </a>
          </li>
        ))}
    </ul>
  );
};

export default SocialLinks;
