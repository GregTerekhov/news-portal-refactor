import React, { FC } from 'react';

import type { IHistoryLog } from 'types';
import { useWindowWidth } from 'contexts';

import { CustomScrollBar } from 'ui';

import { formatTableDates, tableHeads } from '../assistants';

interface TableProps {
  displayedRows: IHistoryLog[];
}

const DEFAULT_TITLE_LENGTH = 60;
const WIDE_SCREENS_TITLE_LENGTH = 87;

const DeletedNewsTable: FC<TableProps> = ({ displayedRows }) => {
  const { wideScreens } = useWindowWidth();

  const getNewsTitle = (title: string): string => {
    let cutTitleLength: number;

    switch (true) {
      case wideScreens:
        cutTitleLength = WIDE_SCREENS_TITLE_LENGTH;
        break;
      default:
        cutTitleLength = DEFAULT_TITLE_LENGTH;
        break;
    }
    return title.length > cutTitleLength ? `${title.slice(0, cutTitleLength)}...` : title;
  };

  const tableRowClass =
    'whitespace-nowrap px-6 text-small font-medium text-darkBase dark:text-whiteBase lg:text-medium';

  return (
    <CustomScrollBar isOpen={true} orientation='horizontal'>
      <table className='mb-2.5 min-w-full divide-y divide-greyAlt/[.4] transition-colors duration-500 dark:divide-greyBase/[.4]'>
        <thead className='bg-accentBase/[.2] transition-colors duration-500 dark:bg-greyBase/[.4]'>
          <tr>
            {tableHeads?.map(({ label }) => (
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
              <tr key={newsUrl} className='group even:bg-greyAlt/[.1]'>
                <td className={`${tableRowClass}`}>
                  <a
                    href={newsUrl}
                    target='_blank'
                    rel='noopener noreferrer nofollow'
                    className='block py-4 transition-colors duration-500 focus:text-accentBase group-hover:text-accentBase lg:text-medium'
                  >
                    {getNewsTitle(title)}
                  </a>
                </td>
                <td className={`${tableRowClass}`}>{category}</td>
                <td className={`${tableRowClass}`}>{formatTableDates(additionDate)}</td>
                <td className={`${tableRowClass}`}>{formatTableDates(deletionDate)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </CustomScrollBar>
  );
};

export default DeletedNewsTable;
