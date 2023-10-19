import React, { useRef } from 'react';
import './CardInput.scss';
import closeBtn from '../../img/Close.svg';

type Props = {
  cardName: string;
  onCardNameSet: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAddCard: () => void;
  onCancelAddCard: () => void;
  onKeyUpCardName: (e: React.KeyboardEvent<HTMLElement>) => void;
};

export const CardInput: React.FC<Props> = ({
  cardName,
  onCardNameSet,
  onAddCard,
  onCancelAddCard,
  onKeyUpCardName,
}) => {
  const handleCardInputBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (e.relatedTarget === closeButtonRef.current) {
      onCancelAddCard();

    } else {
      if (cardName.trim()) {
        onAddCard();
      } else {
        onCancelAddCard();
      }
    }
  };

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="card-input">
      <div className="card-input__container">
        <textarea
          className="card-input__textarea"
          value={cardName}
          onChange={onCardNameSet}
          onKeyUp={onKeyUpCardName}
          onBlur={handleCardInputBlur}
          placeholder="Enter card name"
          autoFocus
        ></textarea>
      </div>

      <div className="card-input__actions">
        <button
          className="card-input__btn card-input__btn--add"
          onClick={onAddCard}
        >
          Add card
        </button>
        <button
          type="button"
          className="card-input__btn card-input__btn--close"
          onClick={onCancelAddCard}
          ref={closeButtonRef}
        >
          <img src={closeBtn} alt="close button" />
        </button>
      </div>
    </div>
  );
};

