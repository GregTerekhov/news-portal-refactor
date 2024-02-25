type User = {
  id: string;
  name: string;
  email: string;
};

type UserInfoList = {
  label: string;
  value: string;
};

type IconsList = {
  iconName: string;
  linked: boolean;
};

type HaveAccounts = {
  google: boolean;
  facebook: boolean;
  apple: boolean;
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
      iconName: 'icon-google',
      linked: haveAccounts.google,
    },
    {
      iconName: 'icon-facebook',
      linked: haveAccounts.facebook,
    },
    {
      iconName: 'icon-apple',
      linked: haveAccounts.apple,
    },
  ];

  return icons.filter((icon) => icon.linked);
};
