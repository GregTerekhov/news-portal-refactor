import React, { FC, useState } from 'react';

import { IHistoryLog, VariantInputs } from 'types';

import { CustomScrollBar, UnverifiableInput } from 'ui';
import TablePagination from './TablePagination';
import DeletedNewsTable from './DeletedNewsTable';

interface IHistoryLogProps {
  logData: IHistoryLog[];
}

const ROWS_PER_PAGE = 7;

const ArchiveHistoryLog: FC<IHistoryLogProps> = ({ logData }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredLogData = searchValue
    ? logData.filter((log) => log.title.toLowerCase().includes(searchValue.toLowerCase()))
    : logData;

  const totalRows = filteredLogData.length;
  const totalPages = Math.ceil(totalRows / ROWS_PER_PAGE);

  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;
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
      <CustomScrollBar isOpen={true} orientation='horizontal'>
        <div className='-m-1.5'>
          <div className='inline-block min-w-full p-1.5 align-middle'>
            <div className='divide-y divide-greyAlt/[.4] rounded-lg border dark:divide-greyBase/[.4] dark:border-greyBase/[.4]'>
              <div className='px-4 py-3'>
                <div className='relative w-[254px] md:max-w-xs'>
                  <UnverifiableInput
                    inputData={{
                      name: 'Deleted news',
                      type: 'text',
                      value: searchValue,
                      placeholder: 'Search for deleted news',
                    }}
                    hasIcon={true}
                    svgName='icon-search'
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleSearchNews(event)
                    }
                    variant={VariantInputs.FilterServiceBlock}
                  />
                </div>
              </div>
              <DeletedNewsTable displayedRows={displayedRows} />
              <div className='mb-3 px-4 py-1'>
                <TablePagination
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </div>
            </div>
          </div>
        </div>
      </CustomScrollBar>
    </div>
  );
};

export default ArchiveHistoryLog;
