export enum Pages {
  Home = 'Home',
  Favourite = 'Favourite',
  Read = 'Read',
  Archive = 'Archive',
  Account = 'Account',
  AccountSettings = 'Account settings',
  About = 'About Us',
}

export interface ActiveLinks {
  isHomeActive: boolean;
  isFavoriteActive: boolean;
  isReadActive: boolean;
  isArchiveActive: boolean;
  isAccountPage: boolean;
  isManageAccountPage: boolean;
  isAboutUs: boolean;
  isServerErrorPage: boolean;
  isErrorPage: boolean;
  isDevelopmentActive: boolean;
}

export enum Paths {
  Home = '/',
  Favourite = '/favourite',
  Read = '/read',
  Archive = '/archive',
  Account = '/account',
  AccountSettings = '/account-manage',
  About = '/about-us',
  ServerError = '/server-error',
  InDevelopment = '/in-development',
}
