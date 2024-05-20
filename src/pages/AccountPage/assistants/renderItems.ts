import { IconName, type HaveAccounts, type User } from 'types';

type UserInfoList = {
  label: string;
  value: string;
};

type IconsList = {
  iconName: IconName;
  linked: boolean;
};

export const renderInfoItems = (user: User): UserInfoList[] => {
  const { id, name, email } = user;

  return [
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
};

export const renderAccountIcons = (haveAccounts: HaveAccounts): IconsList[] => {
  const icons: IconsList[] = [
    {
      iconName: IconName.Google,
      linked: haveAccounts.google,
    },
    {
      iconName: IconName.Facebook,
      linked: haveAccounts.facebook,
    },
    {
      iconName: IconName.Apple,
      linked: haveAccounts.apple,
    },
  ];

  return icons.filter((icon) => icon.linked);
};
