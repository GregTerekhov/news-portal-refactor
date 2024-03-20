import { ICON_SIZES } from 'constants/iconSizes';

type SocialLinks = {
  link: string;
  iconName: string;
  label: string;
  size: keyof typeof ICON_SIZES;
};

export const renderSocialLinks = (wideScreens: boolean): Array<SocialLinks> => {
  const links: SocialLinks[] = [
    {
      link: 'https://www.facebook.com/nytimes',
      iconName: 'facebook',
      label: 'Facebook',
      size: wideScreens ? 'mdIcon28' : 'smIcon20',
    },
    {
      link: 'https://twitter.com/nytimes',
      iconName: 'twitter',
      label: 'Twitter',
      size: wideScreens ? 'mdIcon28' : 'smIcon20',
    },
    {
      link: 'https://www.youtube.com/@nytimes',
      iconName: 'youtube',
      label: 'YouTube',
      size: wideScreens ? 'lgIcon36' : 'mdIcon28',
    },
    {
      link: 'https://www.linkedin.com/company/the-new-york-times/',
      iconName: 'linkedin',
      label: 'LinkedIn',
      size: wideScreens ? 'mdIcon28' : 'smIcon20',
    },
  ];

  return links;
};
