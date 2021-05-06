import React from 'react';
import { Button } from './button/button';

export const CardBody = (props) => {
  return <div className="card-body p-4 h-40 self-center" {...props} />;
};

export const CardHeader = (props) => {
  return <div className="card-header" {...props} />;
};

export const CardImage = (props) => {
  return (
    <div
      className="relative cursor-pointer bg-black rounded-lg shadow-lg group h-60 flex justify-center items-center"
      onClick={props.onClick}
    >
      <div
        style={{
          backgroundImage: `url(${props.bgUrl})`,
        }}
        className="rounded-lg h-full w-full absolute z-10 bg-cover bg-center hover:opacity-50 transition-all duration-500 ease-in-out"
      />
    </div>
  );
};

export const CardContainer = (props) => {
  const { className, ...attributes } = props;
  return (
    <div
      className={`card overflow-hidden shadow bg-white ${className}`}
      {...attributes}
    />
  );
};

export const Card = (props) => {
  const {
    children,
    bgUrl,
    bgTitle,
    onClickImg = () => null,
    url,
    ...attributes
  } = props;
  return (
    <CardContainer {...attributes} className="grid grid-rows-1">
      <CardHeader>
        <CardImage onClick={onClickImg} bgUrl={bgUrl} bgTitle={bgTitle} />
      </CardHeader>
      <CardBody>{children}</CardBody>
      <Button to={url} isLink className="p-2">
        See Detail
      </Button>
    </CardContainer>
  );
};

export default CardContainer;
