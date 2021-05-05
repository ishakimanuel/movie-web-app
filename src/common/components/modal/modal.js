import React from 'react';
import classnames from 'classnames';

import Portal from '../portal';
import './modal.scss';

const Modal = (props) => {
  const [shouldShowContent, setShouldShowContent] = React.useState(false);

  const backdrop = React.useRef(null);

  React.useEffect(() => {
    const { current } = backdrop;

    const clickHandler = (e) => {
      e.target === current && props.closeModal();
    };

    const transitionEnd = () => setShouldShowContent(props.open);

    showContent();

    if (current) {
      current.addEventListener('transitionend', transitionEnd);
      current.addEventListener('click', clickHandler);
    }

    return () => {
      if (current) {
        current.removeEventListener('transitionend', transitionEnd);
        current.removeEventListener('click', clickHandler);
      }
    };
  }, [props.open]);

  const showContent = () => {
    if (props.open) {
      window.setTimeout(() => {
        setShouldShowContent(props.open);
      }, 10);
    }
  };

  const backdropClassNames = classnames(
    'backdrop flex items-center justify-center fixed top-0 right-0 bottom-0 left-0',
    {
      open: shouldShowContent && props.open,
    }
  );

  return (
    <React.Fragment>
      {(props.open || shouldShowContent) && (
        <Portal className="modal-portal">
          <div ref={backdrop} className={backdropClassNames}>
            <div className="modal-content relative bg-white shadow box-border">
              {props.children}
            </div>
          </div>
        </Portal>
      )}
    </React.Fragment>
  );
};

export default Modal;
