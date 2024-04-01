import React, { FC } from 'react';

import { IHistoryLog, VariantInputs } from 'types';

import { UnverifiableInput } from 'ui';
import TablePagination from './TablePagination';
import DeletedNewsTable from './DeletedNewsTable';

import { useDeletedNewsControls } from '../hooks';

interface IHistoryLogProps {
  logData: IHistoryLog[];
}

const ArchiveHistoryLog: FC<IHistoryLogProps> = ({ logData }) => {
  const {
    searchValue,
    currentPage,
    totalPages,
    displayedRows,
    handlePageChange,
    handleSearchNews,
  } = useDeletedNewsControls(logData);

  return (
    <div className='mb-6 flex flex-col overflow-hidden rounded-lg shadow-modal'>
      <div className='inline-block min-w-full align-middle'>
        <div className='divide-y divide-greyAlt/[.4] overflow-hidden rounded-lg border dark:divide-greyBase/[.4] dark:border-greyBase/[.4]'>
          <div className='px-4 py-3 lg:px-6 lg:py-5'>
            <div className='relative w-[254px] md:max-w-xs'>
              <UnverifiableInput
                inputData={{
                  name: 'Deleted news',
                  type: 'text',
                  value: searchValue,
                  placeholder: 'Search for deleted news',
                }}
                hasIcon={true}
                svgName='search'
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSearchNews(event)}
                variant={VariantInputs.FilterServiceBlock}
              />
            </div>
          </div>
          <DeletedNewsTable displayedRows={displayedRows} />
          <TablePagination
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default ArchiveHistoryLog;
