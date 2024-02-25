import React, { FC } from 'react';
import { format } from 'date-fns';

import { IHistoryLog } from 'types';

import { tableHeads } from '../assistants';

interface TableProps {
  displayedRows: IHistoryLog[];
}

const TITLE_LENGTH_LIMIT = 60;

const DeletedNewsTable: FC<TableProps> = ({ displayedRows }) => {
  const tableRowClass =
    'whitespace-nowrap px-6 py-4 text-sm font-medium text-darkBase dark:text-whiteBase';

  return (
    <table className='min-w-full divide-y divide-greyAlt/[.4] transition-colors duration-500 dark:divide-greyBase/[.4]'>
      <thead className='bg-accentBase/[.2] transition-colors duration-500 dark:bg-greyBase/[.4]'>
        <tr>
          {tableHeads &&
            tableHeads?.map(({ label }) => (
              <th
                key={label}
                scope='col'
                className='px-6 py-3 text-start text-xs font-medium uppercase text-greyBase transition-colors duration-500 dark:text-whiteBase md:text-small'
              >
                {label}
              </th>
            ))}
        </tr>
      </thead>
      <tbody className='divide-y divide-whiteBase transition-colors duration-500 dark:divide-gray-700'>
        {Array.isArray(displayedRows) &&
          displayedRows.map((displayedRow) => {
            const { title, newsUrl, category, additionDate, deletionDate } = displayedRow;
            const formattedAdditionDate = format(additionDate, 'dd/MM/yyyy');
            const formattedDeletionDate = format(deletionDate, 'dd/MM/yyyy');
            return (
              <tr key={newsUrl} className='group even:bg-greyAlt/[.1]'>
                <td className={`${tableRowClass}`}>
                  <a
                    href={newsUrl}
                    target='_blank'
                    className='transition-colors duration-500 group-hover:text-accentBase'
                  >
                    {title.length > TITLE_LENGTH_LIMIT ? `${title.slice(0, 65)}...` : title}
                  </a>
                </td>
                <td className={`${tableRowClass}`}>{category}</td>
                <td className={`${tableRowClass}`}>{formattedAdditionDate}</td>
                <td className={`${tableRowClass}`}>{formattedDeletionDate}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default DeletedNewsTable;