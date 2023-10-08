import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/favourite'>Favorite</NavLink>
      <NavLink to='/read'>Read</NavLink>
    </>
  );
};

export default Menu;
