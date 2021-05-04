import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo';

const Header = () => {
  return (
    <div className="bg-dark p-5">
      <Link isLink to="/">
        <Logo size="5xl" />
      </Link>
    </div>
  );
};

export default Header;
