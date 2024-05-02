import React, { FC } from 'react';

import { IHistoryLog, VariantInputs } from 'types';
import { useDBRedux } from 'reduxStore/hooks';
import { useModalStateContext, useNotificationContext, useWindowWidthContext } from 'contexts';

import { usePopUp } from 'hooks';

import { DeleteModal } from 'components';
import { Modal, UnverifiableInput } from 'ui';
import ControlButtons from './ControlButtons';
import DeletedNewsTable from './DeletedNewsTable';
import TablePagination from './TablePagination';

import { useDeletedNewsControls } from '../hooks';

interface IHistoryLogProps {
  logData: IHistoryLog[];
}

const ArchiveHistoryLog: FC<IHistoryLogProps> = ({ logData }) => {
  const { clearLog } = useDBRedux();
  const { showToast } = useNotificationContext();
  const { isMobile, isNotMobile } = useWindowWidthContext();
  const { isOpenModal, modalType } = useModalStateContext();

  const { toggleModal, popUpRef } = usePopUp();
  const {
    searchValue,
    currentPage,
    totalPages,
    displayedRows,
    handlePageChange,
    handleSearchNews,
  } = useDeletedNewsControls(logData);

  const handleClearing = async (): Promise<void> => {
    try {
      const response = await clearLog();
      showToast(response.meta.requestStatus);
    } catch (error) {
      console.error('Error during clearLog:', error);
      throw error;
    }
    toggleModal();
  };

  return (
    <>
      <div className='mb-10 flex flex-col overflow-hidden rounded-lg shadow-modal'>
        <div className='inline-block min-w-full align-middle'>
          <div className='divide-y divide-greyAlt/[.4] overflow-hidden rounded-lg border dark:divide-greyBase/[.4] dark:border-greyBase/[.4]'>
            <div className='px-4 py-3 lg:px-6 lg:py-5'>
              <div className='relative max-md:w-[254px] md:flex md:flex-row-reverse md:items-center md:justify-between'>
                {isMobile ? (
                  <ControlButtons
                    toggleModal={(e: React.MouseEvent<HTMLButtonElement>) =>
                      toggleModal(e, true, 'clearLog')
                    }
                  />
                ) : null}
                <h3 className='mb-4 text-2xl font-medium text-darkBase dark:text-whiteBase'>
                  Deleted news
                </h3>
                <div>
                  <UnverifiableInput
                    inputData={{
                      name: 'Deleted news',
                      type: 'text',
                      value: searchValue,
                      placeholder: 'Title',
                    }}
                    hasIcon={true}
                    svgName='search'
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleSearchNews(event)
                    }
                    variant={VariantInputs.FilterServiceBlock}
                  />
                </div>
              </div>
            </div>
            <DeletedNewsTable displayedRows={displayedRows} />
            <div className='flex justify-between px-4 lg:px-6'>
              <TablePagination
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                totalPages={totalPages}
              />
              {isNotMobile ? (
                <div className='flex gap-x-7'>
                  <ControlButtons
                    toggleModal={(e: React.MouseEvent<HTMLButtonElement>) =>
                      toggleModal(e, true, 'clearLog')
                    }
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {isOpenModal && modalType === 'clearLog' && (
        <Modal closeModal={toggleModal} modalRef={popUpRef}>
          <DeleteModal
            handleClose={(e: React.MouseEvent<HTMLButtonElement>) => toggleModal(e)}
            handleDelete={handleClearing}
            position='clearLog'
            title='Clear log'
            agreementText='clear the log of deleted'
          />
        </Modal>
      )}
    </>
  );
};

export default ArchiveHistoryLog;
