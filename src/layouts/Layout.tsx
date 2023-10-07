import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { PageScrollController, SearchBlock } from 'components';
import { PrimaryButton, VoteButton } from 'ui';

const Layout = () => {
  return (
    <div>
      <Header />

      <PageScrollController />
      <SearchBlock />
      <VoteButton />
      <Outlet />
    </div>
  );
};

export default Layout;
