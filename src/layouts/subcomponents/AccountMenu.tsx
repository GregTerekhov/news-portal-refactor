import React, { FC } from 'react';

import { CommonMenu } from 'ui';
import { MobileMenu } from 'ui/CommonMenu/CommonMenu';

const AccountMenu: FC<MobileMenu> = ({ isOpen, closeMenu }) => {
  return <CommonMenu isOpen={isOpen} navId='account-navigation' closeMenu={closeMenu} />;
};

export default AccountMenu;
