import { useState } from 'react';

export const useOpener = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(prevState => !prevState);
  };

  const setEditClose = () => {
    setIsOpen(false);
  };

  const setEditOpen = () => {
    setIsOpen(true);
  };

  return {
    isOpen,
    handleIsOpen,
    setEditClose,
    setEditOpen
  }
};