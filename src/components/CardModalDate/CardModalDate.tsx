import React from 'react';
import { formatDate } from '../../helpers/functions/formatDate';
import closeBtn from '../../img/Close.svg';
import calendarImg from '../../img/calendar.svg';
import './CardModalDate.scss';

type Props = {
  isEditing: boolean,
  dueDate: Date | null,
  editedDueDate: string,
  onEdit: () => void,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export const CardModalDate: React.FC<Props> = ({
  isEditing,
  dueDate,
  editedDueDate,
  onEdit,
  onChange,
}) => {
  return (
    <div className="card-modal-date">
      {isEditing ? (
        <div className="card-modal-date__container">
          <input
            className="card-modal-date__data card-modal-date__data--date"
            type="date"
            value={editedDueDate}
            onChange={onChange} />
          <button
            onClick={onEdit}
            type="button"
            className="card-modal-date__btn card-modal-date__btn--close"
          >
            <img src={closeBtn} alt="close button" />
          </button>
        </div>
      ) : (
        <>
          <button
            className="card-modal-date__show card-modal-date__btn"
            onClick={onEdit}
          >
            Add date
            <img src={calendarImg} alt="calendar icon" />
          </button>
          {dueDate && (
            <div className="card-modal__date-close">
              {`Expires on ${formatDate(dueDate)}`}
            </div>
          )}
        </>
      )}
    </div>
  );
};
