import React from 'react';
import { Input, PrimaryButton } from 'ui';

const Header = () => {
  return (
    <div className='flex items-center'>
      <a href='pages/HomePage.tsx'>News</a>
      <Input name='query' type='text' placeholder='Search' />
      <PrimaryButton name='Cars' type='button' hasIcon={true} />
    </div>
  );
};

export default Header;
