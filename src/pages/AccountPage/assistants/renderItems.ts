import type { HaveAccounts, User } from 'types';

type UserInfoList = {
  label: string;
  value: string;
};

type IconsList = {
  iconName: string;
  linked: boolean;
};

export const renderInfoItems = (user: User): UserInfoList[] => {
  const { id, name, email } = user;

  const userInfoList: UserInfoList[] = [
    {
      label: 'Account ID: ',
      value: id,
    },
    {
      label: 'Your name: ',
      value: name,
    },
    {
      label: 'Your email: ',
      value: email,
    },
  ];

  return userInfoList;
};

export const renderAccountIcons = (haveAccounts: HaveAccounts): IconsList[] => {
  const icons: IconsList[] = [
    {
      iconName: 'google',
      linked: haveAccounts.google,
    },
    {
      iconName: 'facebook',
      linked: haveAccounts.facebook,
    },
    {
      iconName: 'apple',
      linked: haveAccounts.apple,
    },
  ];

  return icons.filter((icon) => icon.linked);
};
