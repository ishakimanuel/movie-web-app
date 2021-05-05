import React from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [state, setState] = React.useState({});

  const openModal = (state) => {
    setState((prev) => ({ prev, ...state }));
    setIsOpen(true);
  };
  const closeModal = () => {
    setState((prev) => ({ prev, ...state }));
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
    state,
  };
};

export default useModal;
