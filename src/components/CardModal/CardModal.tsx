import React, { useState } from 'react';
import './CardModal.scss';
import { CardTypes } from '../../types/CardTypes';
import { formatDate } from '../../helpers/functions/formatDate';
import { useAppDispatch } from '../../app/hooks';
import { updateCard } from '../../slices/columnSlice';
import { updateTextAreaHeight } from '../../helpers/functions/updateTextAreaHeight';
import { CardModalTitle } from '../CardModalTitle/CardModalTitle';
import { CardModalDescription } from '../CardModalDescription/CardModalDescription';
import { CardModalDate } from '../CardModalDate/CardModalDate';

type Props = {
  card: CardTypes,
  onClose: () => void,
  dueDateColor: string,
  onSaveName: () => void,
  editedName: string,
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

export const CardModal: React.FC<Props> = ({
  card,
  onClose,
  dueDateColor,
  onSaveName,
  editedName,
  onNameChange,
}) => {
  const [isDecriptionEdit, setIsDecriptionEdit] = useState(false);
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const { dueDate, description } = card;
  const [editedDescription, setEditedDescription] = useState(description || '');
  const [editedDueDate, setEditedDueDate] = useState(dueDate ? formatDate(dueDate) : '');
  const [isDateInputEdit, setIsDateInputEdit] = useState(false);

  const dispatch = useAppDispatch();

  const handleModalCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleSave = (e: React.MouseEvent) => {
    const updatedCard = {
      ...card,
      name: editedName,
      description: editedDescription,
    };

    const newDueDate = new Date(editedDueDate); 

    if (
      editedDueDate && 
      !isNaN(newDueDate.getTime()) &&
      editedDueDate !== (dueDate ? formatDate(dueDate) : '')
    ) {
      updatedCard.dueDate = newDueDate;
    }

    dispatch(updateCard(updatedCard));
    handleModalCloseClick(e);
  };

  const handleEditDescription = () => {
    setIsDecriptionEdit(!isDecriptionEdit);
  };

  const handleTitleedit = () => {
    setIsTitleEdit(!isTitleEdit);
  };

  const handleDescriptionSet = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setEditedDescription(textarea.value);
    updateTextAreaHeight(textarea, 100);
  };

  const handleCancelDescription = () => {
    setIsDecriptionEdit(false);
    setEditedDescription(description || '');
  };

  const handleBlurTitle = () => {
    setIsTitleEdit(false);
    onSaveName();
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleBlurTitle();
    }
  };

  const handleDescriptionSave = (e: React.MouseEvent) => {
    const updatedCard = {
      ...card,
      description: editedDescription
    };
    dispatch(updateCard(updatedCard));
    setIsDecriptionEdit(false);
  };

  const handleDateEdit = () => {
    setIsDateInputEdit(!isDateInputEdit);
    setEditedDueDate('');
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedDueDate(e.target.value);
  };

  const cardModalDescription = description || '';
  const cardModalDate = dueDate || null;

  return (
    <div className="card-modal">
      <div className="card-modal__content">
        <CardModalTitle
          title={editedName}
          isEditing={isTitleEdit}
          onEdit={handleTitleedit}
          onBlur={handleBlurTitle}
          onKeyUp={handleKeyUp}
          onChange={onNameChange}
          dueDateColor={dueDateColor}
        />

        <CardModalDescription
          isEditing={isDecriptionEdit}
          description={cardModalDescription}
          editedDescription={editedDescription}
          onEdit={handleEditDescription}
          onSave={handleDescriptionSave}
          onCancel={handleCancelDescription}
          onChange={handleDescriptionSet}
        />

        <CardModalDate
          isEditing={isDateInputEdit}
          dueDate={cardModalDate}
          editedDueDate={editedDueDate}
          onEdit={handleDateEdit}
          onChange={handleDueDateChange}
        />

        <button
          className="card-modal__btn card-modal__btn--save card-modal__btn--last"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="card-modal__btn card-modal__btn--close"
          onClick={handleModalCloseClick}
        >
          Close
        </button>
      </div>
    </div>
  );
};
