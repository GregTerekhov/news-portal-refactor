type SocialLinks = {
  link: string;
  iconName: string;
  label: string;
};

export const renderSocialLinks = (): Array<SocialLinks> => {
  const links: SocialLinks[] = [
    {
      link: 'https://www.facebook.com/nytimes',
      iconName: 'icon-facebook',
      label: 'Facebook',
    },
    {
      link: 'https://twitter.com/nytimes',
      iconName: 'icon-twitter',
      label: 'Twitter',
    },
    {
      link: 'https://www.youtube.com/@nytimes',
      iconName: 'icon-youTube',
      label: 'YouTube',
    },
  ];

  return links;
};
