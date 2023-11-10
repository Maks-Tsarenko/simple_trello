import { ColumnTypes } from 'types/ColumnTypes';
import './ColumnList.scss';
import { Column } from 'components/Column';

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
