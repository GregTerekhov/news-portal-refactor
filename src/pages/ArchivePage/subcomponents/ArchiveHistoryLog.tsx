import React, { FC } from 'react';
import { format } from 'date-fns';

import { IHistoryLog } from 'types';

import { SvgIcon, UnverifiableInput } from 'ui';

interface IHistoryLogProps {
  logData: IHistoryLog[];
}

const ArchiveHistoryLog: FC<IHistoryLogProps> = ({ logData }) => {
  const handleSearchNews = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  return (
    <div className='flex flex-col mb-6'>
      <div className='-m-1.5 overflow-x-auto'>
        <div className='p-1.5 min-w-full inline-block align-middle'>
          <div className='border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700'>
            <div className='py-3 px-4'>
              <div className='relative max-w-xs'>
                <UnverifiableInput
                  inputData={{
                    name: 'Deleted news',
                    type: 'text',
                    placeholder: 'Search for deleted news',
                  }}
                  hasIcon={true}
                  svgName='icon-search'
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSearchNews(event)}
                  variant='filterServiceBlock'
                />
                {/* <label className='sr-only'>Search</label>
                <input
                  type='text'
                  name='hs-table-with-pagination-search'
                  id='hs-table-with-pagination-search'
                  className='py-2 px-3 ps-9 block w-full border-greyAlt shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-darkBase dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600'
                  placeholder='Search for news'
                /> */}
                {/* <div className='absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3'>
                  <SvgIcon
                    svgName='icon-search'
                    size={20}
                    className='fill-accentBase dark:fill-whiteBase'
                  />
                </div> */}
              </div>
            </div>
            <div className='overflow-hidden'>
              <table className='min-w-full divide-y divide-gray-200 dark:divide-greyBase/[.4]'>
                <thead className='bg-gray-50 dark:bg-greyBase/[.4]'>
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
                  {logData &&
                    logData.map(({ title, newsUrl, category, additionDate, deletionDate }) => (
                      <tr key={newsUrl}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                          <a href={newsUrl}>
                            {title}hjhdshfksdhkfjhskjhdkjfhkjh jhfskjdhfks shfdjkshfk shdjfhk{' '}
                          </a>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'>
                          {category}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200'>
                          {format(additionDate, 'dd/MM/yyyy')};
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200'>
                          {format(deletionDate, 'dd/MM/yyyy')}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className='py-1 px-4'>
              <nav className='flex items-center space-x-1'>
                <button
                  type='button'
                  className='p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                >
                  <span aria-hidden='true'>
                    <SvgIcon
                      svgName='icon-arrow-left'
                      size={16}
                      className='stroke-accentBase dark:stroke-whiteBase'
                    />
                  </span>
                  <span className='sr-only'>Previous</span>
                </button>
                <button
                  type='button'
                  className='min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10'
                  aria-current='page'
                >
                  1
                </button>
                <button
                  type='button'
                  className='min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10'
                >
                  2
                </button>
                <button
                  type='button'
                  className='min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10'
                >
                  3
                </button>
                <button
                  type='button'
                  className='p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                >
                  <span className='sr-only'>Next</span>
                  <span aria-hidden='true'>
                    <SvgIcon
                      svgName='icon-arrow-right'
                      size={16}
                      className='stroke-accentBase fill-transparent dark:stroke-whiteBase'
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
