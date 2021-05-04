import React from 'react';

export const CardBody = (props) => {
  return <div className="card-body p-4" {...props} />;
};

export const CardHeader = (props) => {
  return <div className="card-header" {...props} />;
};

export const CardImage = (props) => {
  return (
    <div
      className="relative bg-black shadow-lg group h-80 flex justify-center items-center"
      onClick={props.onClick}
    >
      <div
        style={{
          backgroundImage: `url(${props.bgUrl})`,
          overflow: 'hidden',
        }}
        className="h-full w-full absolute z-10 bg-cover bg-center hover:opacity-50 transition-all duration-500 ease-in-out"
      />
      <p className="font-bold text-lg text-white absolute z-20 pointer-events-none">
        {props.bgTitle}
      </p>
    </div>
  );
};

export const Card = (props) => {
  const { className, ...attributes } = props;
  return (
    <div
      className={`card overflow-hidden shadow bg-white ${className}`}
      {...attributes}
    />
  );
};

export const CardWithImage = (props) => {
  const {
    children,
    bgUrl,
    bgTitle,
    onClickImg = () => null,
    ...attributes
  } = props;
  return (
    <Card {...attributes}>
      <CardHeader>
        <CardImage onClick={onClickImg} bgUrl={bgUrl} bgTitle={bgTitle} />
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default Card;
