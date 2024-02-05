import { ICON_SIZES } from 'constants/iconSizes';

type SocialLinks = {
  link: string;
  iconName: string;
  label: string;
  size: number;
};

export const renderSocialLinks = (): Array<SocialLinks> => {
  const links: SocialLinks[] = [
    {
      link: 'https://www.facebook.com/nytimes',
      iconName: 'icon-facebook',
      label: 'Facebook',
      size: ICON_SIZES.smIcon20,
    },
    {
      link: 'https://twitter.com/nytimes',
      iconName: 'icon-twitter',
      label: 'Twitter',
      size: ICON_SIZES.smIcon20,
    },
    {
      link: 'https://www.youtube.com/@nytimes',
      iconName: 'icon-youTube',
      label: 'YouTube',
      size: ICON_SIZES.mdIcon28,
    },
  ];

  return links;
};
