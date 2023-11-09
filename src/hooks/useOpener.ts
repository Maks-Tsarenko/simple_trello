import { useState } from 'react';

export const useOpener = () => {
  const [isOpen, setIsOpen] = useState(false);

  const setIsHiden = () => {
    setIsOpen(false);
  };

  const setIsVisible = () => {
    setIsOpen(true);
  };

  return {
    isOpen,
    setIsHiden,
    setIsVisible
  }
};