import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children, context = '' }) => {
  const baseElement = React.useMemo(() => document.createElement('div'), []);

  const registerPortalElement = (element) => {
    const target = document.body;
    const classList = ['portal-container', context];
    classList.forEach((item) => item && element.classList.add(item));
    target.appendChild(element);

    return target;
  };

  useEffect(() => {
    const target = registerPortalElement(baseElement);

    return () => {
      target.removeChild(baseElement);
    };
  }, [baseElement]);

  return ReactDOM.createPortal(children, baseElement);
};

export default Portal;
