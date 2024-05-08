import type { HaveAccounts } from 'types';

//Визначення наявності значення прив'язаного акаунту
export const getHasAccount = (haveAccounts: HaveAccounts): keyof HaveAccounts => {
  return Object.keys(haveAccounts).find((key) =>
    haveAccounts.hasOwnProperty(key),
  ) as keyof HaveAccounts;
};
