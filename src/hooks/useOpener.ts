import { useState } from 'react';

export const useOpener = () => {
  const [isOpen, setIsOpen] = useState(false);

  const setIsHidden = () => {
    setIsOpen(false);
  };

  const setIsVisible = () => {
    setIsOpen(true);
  };

  return {
    isOpen,
    setIsHidden,
    setIsVisible
  }
};