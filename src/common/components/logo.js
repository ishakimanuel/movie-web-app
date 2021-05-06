import React from 'react';

const Logo = (props) => {
  return (
    <div>
      <h1 className={`logo ff-heading text-${props.size} ${props.className}`}>
        <span className="text-primary">Movie</span>
        <span className="text-white">WebApp</span>
      </h1>
    </div>
  );
};

Logo.defaultProps = {
  size: '8xl',
};

export default Logo;
