import React, { FC } from 'react';

import { ScrollOrientation, type IHistoryLog } from 'types';

import { useWindowWidthContext } from 'contexts';

import { CustomScrollBar } from 'ui';

import { formatDateToString } from 'helpers';
import { getNewsTitle, tableHeads } from '../assistants';

interface ITableProps {
  displayedRows: IHistoryLog[];
}

const DeletedNewsTable: FC<ITableProps> = ({ displayedRows }) => {
  const { isWideScreens } = useWindowWidthContext();

  const tableRowClass =
    'whitespace-nowrap px-6 text-small font-medium text-darkBase dark:text-whiteBase lg:text-medium group-hover:text-whiteBase transition-colors duration-500';

  return (
    <CustomScrollBar isOpen={true} orientation={ScrollOrientation.Horisontal}>
      <table className='mb-2.5 min-w-full divide-y divide-greyAlt/[.4] transition-colors duration-500 dark:divide-greyBase/[.4]'>
        <thead className='bg-accentBase/[.2] transition-colors duration-500 dark:bg-greyBase/[.4]'>
          <tr>
            {Array.isArray(tableHeads) &&
              tableHeads.map(({ label }) => (
                <th
                  key={label}
                  scope='col'
                  className='px-6 py-3 text-start text-xs font-medium uppercase text-greyBase transition-colors duration-500 dark:text-whiteBase md:text-small lg:text-xl'
                >
                  {label}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-whiteBase transition-colors duration-500 dark:divide-gray-700'>
          {Array.isArray(displayedRows) &&
            displayedRows.map(({ title, newsUrl, category, additionDate, deletionDate }) => (
              <tr
                key={newsUrl}
                className='group transition-colors duration-500 even:bg-greyAlt/[.1] hover:bg-accentBase/65'
              >
                <td className={tableRowClass}>
                  <a
                    href={newsUrl}
                    target='_blank'
                    rel='noopener noreferrer nofollow'
                    className='block py-4 lg:text-medium'
                  >
                    {getNewsTitle(title, isWideScreens)}
                  </a>
                </td>
                <td className={tableRowClass}>{category}</td>
                <td className={tableRowClass}>{formatDateToString(additionDate).dayMonthYear}</td>
                <td className={tableRowClass}>{formatDateToString(deletionDate).dayMonthYear}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </CustomScrollBar>
  );
};

export default DeletedNewsTable;
