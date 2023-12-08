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

export const renderAccountIcons = (): IconsList[] => {
  const connectedAccountsIconsList: IconsList[] = [
    {
      iconName: 'icon-google',
    },
    {
      iconName: 'icon-facebook',
    },
    {
      iconName: 'icon-apple',
    },
  ];

  return connectedAccountsIconsList;
};
