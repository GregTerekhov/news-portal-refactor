import React, { FC, useState } from 'react';
import { format } from 'date-fns';

import { IHistoryLog } from 'types';

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
    console.log(event.target.value);
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
    <div className='flex flex-col mb-6'>
      <div className='-m-1.5 overflow-x-auto'>
        <div className='p-1.5 min-w-full inline-block align-middle'>
          <div className='border rounded-lg divide-y divide-greyAlt dark:border-greyBase/[.4] dark:divide-greyBase/[.4] shadow-darkCard'>
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
                  variant='filterServiceBlock'
                />
              </div>
            </div>
            <div className='overflow-hidden'>
              <table className='min-w-full divide-y divide-gray-200 dark:divide-greyBase/[.4]'>
                <thead className='bg-greyAlt dark:bg-greyBase/[.4]'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-start text-xs md:text-small font-medium text-greyAlt uppercase'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-start text-xs md:text-small font-medium text-greyAlt uppercase'
                    >
                      Category
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-start text-xs  md:text-small font-medium text-greyAlt uppercase'
                    >
                      Addition Date
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-start text-xs md:text-small font-medium text-greyAlt uppercase'
                    >
                      Deletion Date
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                  {displayedRows &&
                    displayedRows.map(
                      ({ title, newsUrl, category, additionDate, deletionDate }) => (
                        <tr key={newsUrl}>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-darkBase dark:text-whiteBase'>
                            <a
                              href={newsUrl}
                              target='_blank'
                              className=' hover:text-accentBase transition-colors duration-500'
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
                  className='p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
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
                    className='min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10'
                    onClick={() => handlePageChange(index + 1)}
                    // Додайте клас "current" для поточної сторінки
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  type='button'
                  onClick={() => handlePageChange(currentPage + 1)}
                  className='p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
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
