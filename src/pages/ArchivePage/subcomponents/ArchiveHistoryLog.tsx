import React, { FC, useState } from 'react';
import { format } from 'date-fns';

import { IHistoryLog, VariantInputs } from 'types';

import { SvgIcon, UnverifiableInput } from 'ui';

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
    <div className='flex flex-col mb-6 rounded-lg shadow-modal overflow-hidden'>
      <div className='-m-1.5 overflow-x-auto'>
        <div className='p-1.5 min-w-full inline-block align-middle'>
          <div className='border rounded-lg divide-y divide-greyAlt/[.4] dark:border-greyBase/[.4] dark:divide-greyBase/[.4]'>
            <div className='py-3 px-4'>
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
                      className='px-6 py-3 text-start text-xs md:text-small font-medium text-greyBase dark:text-whiteBase uppercase'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-start text-xs md:text-small font-medium text-greyBase dark:text-whiteBase uppercase'
                    >
                      Category
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-start text-xs  md:text-small font-medium text-greyBase dark:text-whiteBase uppercase'
                    >
                      Addition Date
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-start text-xs md:text-small font-medium text-greyBase dark:text-whiteBase uppercase'
                    >
                      Deletion Date
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                  {displayedRows &&
                    displayedRows.map(
                      ({ title, newsUrl, category, additionDate, deletionDate }) => (
                        <tr key={newsUrl} className='even:bg-greyAlt/[.1] group'>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-darkBase dark:text-whiteBase'>
                            <a
                              href={newsUrl}
                              target='_blank'
                              className=' group-hover:text-accentBase transition-colors duration-500'
                            >
                              {title.length > 60 ? `${title.slice(0, 65)}...` : title}
                            </a>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-darkBase dark:text-whiteBase'>
                            {category}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-darkBase dark:text-whiteBase'>
                            {format(additionDate, 'dd/MM/yyyy')}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-darkBase dark:text-whiteBase'>
                            {format(deletionDate, 'dd/MM/yyyy')}
                          </td>
                        </tr>
                      ),
                    )}
                </tbody>
              </table>
            </div>
            <div className='py-1 px-4'>
              <nav className='flex items-center space-x-1'>
                <button
                  type='button'
                  onClick={() => handlePageChange(currentPage - 1)}
                  className='p-2.5 inline-flex items-center gap-x-2 rounded-full hover:bg-greyAlt/[.2] disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-whiteBase/[.2] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                >
                  <span aria-hidden='true'>
                    <SvgIcon
                      svgName='icon-arrow-left'
                      size={20}
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
                    className='min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-greyAlt/[.2] py-2.5 text-sm rounded-full dark:text-white dark:hover:bg-whiteBase/[.2]'
                    onClick={() => handlePageChange(index + 1)}
                    // Додайте клас "current" для поточної сторінки
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  type='button'
                  onClick={() => handlePageChange(currentPage + 1)}
                  className='p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-greyAlt/[.2] disabled:opacity-50 disabled:pointer-events-none  dark:hover:bg-whiteBase/[.2] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                >
                  <span className='sr-only'>Next</span>
                  <span aria-hidden='true'>
                    <SvgIcon
                      svgName='icon-arrow-left'
                      size={20}
                      className='fill-accentBase dark:fill-whiteBase rotate-180'
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
