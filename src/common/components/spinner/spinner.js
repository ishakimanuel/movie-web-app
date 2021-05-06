import React from 'react';
import './spinner.scss';

const Spinner = () => {
  return (
    <div
      role="spinner"
      className="spinner mt-2 mx-auto ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"
    />
  );
};

export default Spinner;
