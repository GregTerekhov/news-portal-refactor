import { Auth, Menu, ThemeSwitcher } from '../components';
import React from 'react';
import { Input } from '../ui';

const Header = () => {
  return (
    <div>
      <a href='../pages/HomePage.tsx'>News</a>
      <Menu />
      <Input />
      <ThemeSwitcher />
      <Auth />
    </div>
  );
};

export default Header;
