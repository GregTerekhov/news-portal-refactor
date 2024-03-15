import { ICON_SIZES } from 'constants/iconSizes';

type SocialLinks = {
  link: string;
  iconName: string;
  label: string;
  size: number;
};

export const renderSocialLinks = (wideScreens: boolean): Array<SocialLinks> => {
  const links: SocialLinks[] = [
    {
      link: 'https://www.facebook.com/nytimes',
      iconName: 'facebook',
      label: 'Facebook',
      size: wideScreens ? ICON_SIZES.mdIcon28 : ICON_SIZES.smIcon20,
    },
    {
      link: 'https://twitter.com/nytimes',
      iconName: 'twitter',
      label: 'Twitter',
      size: wideScreens ? ICON_SIZES.mdIcon28 : ICON_SIZES.smIcon20,
    },
    {
      link: 'https://www.youtube.com/@nytimes',
      iconName: 'youtube',
      label: 'YouTube',
      size: wideScreens ? ICON_SIZES.lgIcon36 : ICON_SIZES.mdIcon28,
    },
    {
      link: 'https://www.linkedin.com/company/the-new-york-times/',
      iconName: 'linkedin',
      label: 'LinkedIn',
      size: wideScreens ? ICON_SIZES.mdIcon28 : ICON_SIZES.smIcon20,
    },
  ];

  return links;
};
