import { ColumnTypes } from '../../types/ColumnTypes';
import { Column } from '../Column/Column';
import './ColumnList.scss';

type Props = {
  columns: ColumnTypes[];
};

export const ColumnList: React.FC<Props> = ({ columns }) => {
  return (
    <>
      {columns.map(column => {
        return (
          <div
            key={column.id}
            className="column-list"
          >
            <Column
              column={column}
            />
          </div>
        )
      })}
    </>
  );
};
