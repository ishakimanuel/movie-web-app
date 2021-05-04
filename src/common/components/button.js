import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

export const Button = (props) => {
  let { className, isLink, Tag, theme, size, ...rest } = props;

  const styleMap = {
    size: {
      big: 'p-4 text-2xl',
      normal: 'p-2 text-base',
    },
    theme: {
      primary: 'bg-primary',
    },
  };

  const classNames = classnames(
    'button font-bold text-white uppercase ff-heading',
    `${styleMap.size[size]}`,
    `${styleMap.theme[theme]}`,
    className
  );

  if (isLink) {
    Tag = Link;
  }

  return <Tag className={classNames} {...rest} />;
};

Button.defaultProps = {
  theme: 'primary',
  size: 'normal',
  Tag: 'button',
};

export const ButtonLink = () => {
  return <Button></Button>;
};
