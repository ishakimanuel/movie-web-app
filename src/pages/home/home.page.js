import React from 'react';
import { Button } from 'common/components/button';
import Logo from 'common/components/logo';
import './home.scss';

const HomePage = () => {
  return (
    <div className="homepage flex h-screen bg-dark flex-col items-center justify-center text-center">
      <div className="w-50">
        <Logo />
        <Button
          aria-label="explore-button"
          className="mt-5 inline-block"
          size="big"
          isLink
          to="/movies"
        >
          Explore Now
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
