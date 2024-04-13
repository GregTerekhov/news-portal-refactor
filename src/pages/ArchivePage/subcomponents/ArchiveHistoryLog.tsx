import React, { FC } from 'react';

import { IHistoryLog, VariantInputs } from 'types';
import { useWindowWidthContext } from 'contexts';

import { Hint, UnverifiableInput } from 'ui';
import TablePagination from './TablePagination';
import DeletedNewsTable from './DeletedNewsTable';
import ClearLogButton from './ClearLogButton';

import { useDeletedNewsControls } from '../hooks';

interface IHistoryLogProps {
  logData: IHistoryLog[];
}

const ArchiveHistoryLog: FC<IHistoryLogProps> = ({ logData }) => {
  const { isMobile, isNotMobile } = useWindowWidthContext();
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
            <div className='relative max-md:w-[254px] md:flex  md:flex-row-reverse md:items-center md:justify-between'>
              {isMobile ? (
                <Hint
                  label='Clear deleted news log'
                  side='bottom'
                  ariaLabel='Button for clearing deleted news` log'
                  sideOffset={0}
                >
                  <div>
                    <ClearLogButton />
                  </div>
                </Hint>
              ) : null}
              <h3 className='mb-4 text-2xl font-medium text-darkBase dark:text-whiteBase'>
                Deleted news
              </h3>
              <UnverifiableInput
                inputData={{
                  name: 'Deleted news',
                  type: 'text',
                  value: searchValue,
                  placeholder: 'Title',
                }}
                hasIcon={true}
                svgName='search'
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSearchNews(event)}
                variant={VariantInputs.FilterServiceBlock}
              />
            </div>
          </div>
          <DeletedNewsTable displayedRows={displayedRows} />
          <div className='flex max-w-xl justify-between'>
            <TablePagination
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
            />
            {isNotMobile ? <ClearLogButton /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveHistoryLog;
