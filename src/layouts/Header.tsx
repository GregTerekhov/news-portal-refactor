import { Auth, Menu, ThemeSwitcher } from '../components';
import React from 'react';
import { Input, PrimaryButton, VoteButton } from 'ui';

const Header = () => {
  return (
    <div style={{ display: 'flex', gap: '70px' }}>
      <a href='pages/HomePage.tsx'>News</a>
      <Input name='query' type='text' placeholder='Enter your query' />
      <PrimaryButton name={null} type='button' hasIcon={true} />

      {/* <Menu /> 
       <ThemeSwitcher />
      <Auth /> */}
    </div>
  );
};

export default Header;
