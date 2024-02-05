import React, { FC, useState } from 'react';
import { format } from 'date-fns';

import { IHistoryLog, VariantInputs } from 'types';

import { SvgIcon, UnverifiableInput } from 'ui';
import { ICON_SIZES } from 'constants/iconSizes';

interface IHistoryLogProps {
  logData: IHistoryLog[];
}

const ArchiveHistoryLog: FC<IHistoryLogProps> = ({ logData }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredLogData = searchValue
    ? logData.filter((log) => log.title.toLowerCase().includes(searchValue.toLowerCase()))
    : logData;

  const rowsPerPage = 7;
  const totalRows = filteredLogData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = filteredLogData.slice(startIndex, endIndex);

  const handleSearchNews = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchValue(query);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className='mb-6 flex flex-col overflow-hidden rounded-lg shadow-modal'>
      <div className='-m-1.5 overflow-x-auto'>
        <div className='inline-block min-w-full p-1.5 align-middle'>
          <div className='divide-y divide-greyAlt/[.4] rounded-lg border dark:divide-greyBase/[.4] dark:border-greyBase/[.4]'>
            <div className='px-4 py-3'>
              <div className='relative max-w-xs'>
                <UnverifiableInput
                  inputData={{
                    name: 'Deleted news',
                    type: 'text',
                    value: searchValue,
                    placeholder: 'Search for deleted news',
                  }}
                  hasIcon={true}
                  svgName='icon-search'
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSearchNews(event)}
                  variant={VariantInputs.FilterServiceBlock}
                />
              </div>
            </div>
            <div className='overflow-hidden'>
              <table className='min-w-full divide-y divide-greyAlt/[.4] dark:divide-greyBase/[.4]'>
                <thead className='bg-accentBase/[.2] dark:bg-greyBase/[.4]'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-start text-xs font-medium uppercase text-greyBase dark:text-whiteBase md:text-small'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-start text-xs font-medium uppercase text-greyBase dark:text-whiteBase md:text-small'
                    >
                      Category
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-start text-xs  font-medium uppercase text-greyBase dark:text-whiteBase md:text-small'
                    >
                      Addition Date
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-start text-xs font-medium uppercase text-greyBase dark:text-whiteBase md:text-small'
                    >
                      Deletion Date
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                  {displayedRows &&
                    displayedRows.map(
                      ({ title, newsUrl, category, additionDate, deletionDate }) => (
                        <tr key={newsUrl} className='group even:bg-greyAlt/[.1]'>
                          <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-darkBase dark:text-whiteBase'>
                            <a
                              href={newsUrl}
                              target='_blank'
                              className=' transition-colors duration-500 group-hover:text-accentBase'
                            >
                              {title.length > 60 ? `${title.slice(0, 65)}...` : title}
                            </a>
                          </td>
                          <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-darkBase dark:text-whiteBase'>
                            {category}
                          </td>
                          <td className='whitespace-nowrap px-6 py-4 text-sm text-darkBase dark:text-whiteBase'>
                            {format(additionDate, 'dd/MM/yyyy')}
                          </td>
                          <td className='whitespace-nowrap px-6 py-4 text-sm text-darkBase dark:text-whiteBase'>
                            {format(deletionDate, 'dd/MM/yyyy')}
                          </td>
                        </tr>
                      ),
                    )}
                </tbody>
              </table>
            </div>
            <div className='px-4 py-1'>
              <nav className='flex items-center space-x-1'>
                <button
                  type='button'
                  onClick={() => handlePageChange(currentPage - 1)}
                  className='inline-flex items-center gap-x-2 rounded-full p-2.5 hover:bg-greyAlt/[.2] disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-whiteBase/[.2] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                >
                  <span aria-hidden='true'>
                    <SvgIcon
                      svgName='icon-arrow-left'
                      size={ICON_SIZES.smIcon20}
                      className='fill-accentBase dark:fill-whiteBase'
                    />
                  </span>
                  <span className='sr-only'>Previous</span>
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    type='button'
                    aria-current='page'
                    className='flex min-w-[40px] items-center justify-center rounded-full py-2.5 text-sm text-gray-800 hover:bg-greyAlt/[.2] dark:text-white dark:hover:bg-whiteBase/[.2]'
                    onClick={() => handlePageChange(index + 1)}
                    // Додайте клас "current" для поточної сторінки
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  type='button'
                  onClick={() => handlePageChange(currentPage + 1)}
                  className='inline-flex items-center gap-x-2 rounded-full p-2.5 text-sm text-gray-800 hover:bg-greyAlt/[.2] disabled:pointer-events-none disabled:opacity-50  dark:hover:bg-whiteBase/[.2] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                >
                  <span className='sr-only'>Next</span>
                  <span aria-hidden='true'>
                    <SvgIcon
                      svgName='icon-arrow-left'
                      size={ICON_SIZES.smIcon20}
                      className='rotate-180 fill-accentBase dark:fill-whiteBase'
                    />
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveHistoryLog;
