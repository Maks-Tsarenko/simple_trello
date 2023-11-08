import React from 'react';
import './CardModal.scss';
import { useForm } from 'react-hook-form';
import { CardTypes } from 'types/CardTypes';
import { formatDate } from 'helpers/functions/formatDate';
import { useAppDispatch } from 'store/hooks';
import { updateCard } from 'slices/columnSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import descripLogo from 'img/description.svg';
import { getCurrentColor } from 'helpers/functions/getCurrentColor';
import { schema } from 'helpers/functions/schema';

type Props = {
  card: CardTypes,
  onClose: () => void,
  onSaveName: () => void,
  editedName: string,
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

interface IFormInput {
  name: string;
  description?: string | null;
  dueDate?: string | null;
}

export const CardModal: React.FC<Props> = ({
  card,
  onClose,
  onSaveName,
}) => {
  const { dueDate, description, name } = card;
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState: { errors }, } = useForm<IFormInput>({
    defaultValues: {
      name: name,
      description: description,
      dueDate: dueDate ? formatDate(dueDate) : '',
    },
    resolver: yupResolver(schema),
  });

  const handleModalCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const onSubmit = (data: IFormInput) => {
    let dueDateObject: Date | null = null;

    if (data.dueDate) {
      const parsedDate = new Date(data.dueDate);
      if (!isNaN(parsedDate.getTime())) {
        dueDateObject = parsedDate;
      }
    }

    const updatedCard = {
      ...card,
      name: data.name,
      description: data.description,
      dueDate: dueDateObject,
    };

    dispatch(updateCard(updatedCard as CardTypes));
    onClose();
  };

  const handleBlurTitle = () => {
    onSaveName();
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleBlurTitle();
    }
  };

  return (
    <div className="card-modal">
      <form
        className="card-modal__content"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={`card-modal-title__header card-modal-title__header${getCurrentColor(dueDate)}`}>
          <input
            className="card-modal-title__data card-modal-title__data--title"
            onKeyUp={handleKeyUp}
            type='text'
            {...register("name")}
          />

          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div className="card-modal-description">
          <div className="card-modal-description__header">
            <img className="card-modal-description__icon" src={descripLogo} alt="icon" />
            <h3 className="card-modal-description__title">Description</h3>
          </div>

          <textarea
            className="card-modal-description__data card-modal-description__data--description"
            {...register("description")}
          ></textarea>

          {errors.description && <p className="error-message">{errors.description.message}</p>}
        </div>

        <div className="card-modal-date">
          <div className="card-modal-date__container">
            <input
              className="card-modal-date__data card-modal-date__data--date"
              type="date"
              {...register("dueDate")}
            />
          </div>
        </div>
        
        <button
          className="card-modal__btn card-modal__btn--save card-modal__btn--last"
          type="submit"
        >
          Save
        </button>
        <button
          className="card-modal__btn card-modal__btn--close"
          onClick={handleModalCloseClick}
        >
          Close
        </button>
      </form>
    </div>
  );
};
