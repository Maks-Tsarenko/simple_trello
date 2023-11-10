import React from 'react';
import './CardModal.scss';
import { useForm, useWatch } from 'react-hook-form';
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
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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

  const { register, handleSubmit, setValue, control, formState: { errors }, } = useForm<IFormInput>({
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

  const currentDueDate = useWatch({ name: 'dueDate', control });  
  const formattedDate = formatStringToDate(currentDueDate);

  return (
    <div className="card-modal">
      <form
        className="card-modal__content"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={`card-modal-title__header card-modal-title__header${getCurrentColor(dueDate)}`}>
          <h3 className="card-modal__title">
            Card name
          </h3>

          <TextField
            onKeyUp={handleKeyUp}
            id="outlined-basic"
            variant="outlined"
            {...register("name")}
            error={errors.name ? true : false}
            sx={{
              width: '100%',
              bgcolor: '#fff',
              '.MuiInputBase-input': {
                height: '20px',
                boxSizing: 'border-box',
              },
            }}
          />

          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div className="card-modal-description">
          <div className="card-modal-description__header">
            <img className="card-modal-description__icon" src={iconForDescription} alt="icon" />
            <h3 className="card-modal-description__title">Description</h3>
          </div>

          <TextField
            {...register("description")}
            placeholder='Enter description'
            multiline
            error={errors.description ? true : false}
            sx={{
              width: '600px',
            }}
          />

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
                  selected={formattedDate}
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
                  selected={formattedDate}
                  onChange={onDateChange}
                  dateFormat="dd.MM.yyyy"
                  minDate={tenYearsAgo}
                  maxDate={tenYearsFromNow}
                />
              </>
            )}
          </div>
        </div>

        <Button
          variant="contained"
          type="submit"
        >
          Save
        </Button>

        <Button
          variant="contained"
          type="submit"
          onClick={handleModalCloseClick}
          sx={{
            bgcolor: '#f8f9fa',
            ':hover': { bgcolor: '#d5d8db' },
            color: '#333',
          }}
        >
          Close
        </Button>
      </form>
    </div>
  );
};
