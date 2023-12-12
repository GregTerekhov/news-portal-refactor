import React, { FC } from 'react';

import { CommonMenu } from 'ui';
import { MobileMenu } from 'ui/CommonMenu/CommonMenu';

const MainMenu: FC<MobileMenu> = ({ isOpen, closeMenu }) => {
  return <CommonMenu isOpen={isOpen} navId='main-navigation' closeMenu={closeMenu} />;
};

export default MainMenu;
