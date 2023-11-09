import React from 'react';
import './CardModal.scss';
import { useForm } from 'react-hook-form';
import { CardTypes } from 'types/CardTypes';
import { useAppDispatch } from 'store/hooks';
import { updateCard } from 'slices/columnSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import iconForDescription from 'img/description.svg';
import { getCurrentColor } from 'helpers/functions/getCurrentColor';
import { schema } from 'helpers/functions/schema';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addYears, subYears } from 'date-fns';
import { formatDateToString } from 'helpers/functions/formatDateToString';
import { formatStringToDate } from 'helpers/functions/formatStringToDate';

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
  const tenYearsAgo = subYears(new Date(), 10);
  const tenYearsFromNow = addYears(new Date(), 10);

  const { register, handleSubmit, setValue, watch, formState: { errors }, } = useForm<IFormInput>({
    defaultValues: {
      name: name,
      description: description,
      dueDate: dueDate ? formatDateToString(dueDate) : '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormInput) => {
    const dueDate = formatStringToDate(data.dueDate);
    const descriptionValue = data.description ?? '';

    const updatedCard = {
      ...card,
      name: data.name,
      description: descriptionValue,
      dueDate: dueDate,
    };

    dispatch(updateCard(updatedCard));
    onClose();
  };

  const handleModalCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const onDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = formatDateToString(date);
      setValue("dueDate", formattedDate);
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
            <img className="card-modal-description__icon" src={iconForDescription} alt="icon" />
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
            {dueDate ? (
              <>
                <div className="card-modal__date-close card-modal__date-choose">
                  Expires on
                </div>
                
                <DatePicker
                  selected={formatStringToDate(watch('dueDate'))}
                  onChange={onDateChange}
                  dateFormat="dd.MM.yyyy"
                  minDate={tenYearsAgo}
                  maxDate={tenYearsFromNow}
                />
              </>
            ) : (
              <>
              <div className="card-modal__date-close card-modal__date-choose">
                Choose date
              </div>

              <DatePicker
                selected={formatStringToDate(watch('dueDate'))}
                onChange={onDateChange}
                dateFormat="dd.MM.yyyy"
                minDate={tenYearsAgo}
                maxDate={tenYearsFromNow}
              />
            </>
            )}

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
