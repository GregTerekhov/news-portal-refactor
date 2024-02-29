import React, { FC } from 'react';

import { SvgIcon } from 'ui';

import { renderSocialLinks } from '../assistants';

const SocialLinks: FC = () => {
  const socialLinks = renderSocialLinks();
  return (
    <ul className='flex items-center gap-x-3'>
      {socialLinks &&
        socialLinks.map(({ label, link, iconName, size }) => (
          <li key={label}>
            <a href={link} aria-label={`${label} NYTimes button link`}>
              <SvgIcon svgName={iconName} size={size} className='fill-whiteBase' />
            </a>
          </li>
        ))}
    </ul>
  );
};

export default SocialLinks;
