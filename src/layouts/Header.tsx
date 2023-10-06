import React from 'react';
import { Menu, ThemeSwitcher, Auth } from 'components';
import { Input } from 'ui';

const Header = () => {
  return (
    <div>
      <a href='pages/HomePage.tsx'>News</a>
      <Menu />
      <Input />
      <ThemeSwitcher />
      <Auth />
    </div>
  );
};

export default Header;
