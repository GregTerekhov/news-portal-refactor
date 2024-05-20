import React, { FC } from 'react';

import {
  DeleteModalTitle,
  IconName,
  InputName,
  InputType,
  ModalType,
  VariantsPlaceholder,
  type IHistoryLog,
} from 'types';

import { useDBRedux } from 'reduxStore/hooks';
import { useModalStateContext, useNotificationContext, useWindowWidthContext } from 'contexts';

import { DeleteModal, Modal, UnverifiableInput } from 'ui';
import ControlButtons from './ControlButtons';
import DeletedNewsTable from './DeletedNewsTable';
import TablePagination from './TablePagination';

import { usePopUp } from 'hooks';
import { useDeletedNewsControls } from '../hooks';

interface IHistoryLogProps {
  logData: IHistoryLog[];
}

const ArchiveHistoryLog: FC<IHistoryLogProps> = ({ logData }) => {
  const { requestStatus, clearLog, archiveHistoryLog } = useDBRedux();

  const { showToast } = useNotificationContext();
  const { isSmallScreens, isNotMobile } = useWindowWidthContext();
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
      await clearLog();
      requestStatus && showToast(requestStatus);
    } catch (error) {
      console.error('Error during clearLog:', error);
      throw error;
    }
    toggleModal();
  };

  return (
    <>
      <div
        className={`${archiveHistoryLog?.length === 0 ? 'mb-5' : 'mb-10'} flex flex-col overflow-hidden rounded-lg shadow-modal`}
      >
        <div className='inline-block min-w-full align-middle'>
          <div className='divide-y divide-greyAlt/[.4] overflow-hidden rounded-lg border dark:divide-greyBase/[.4] dark:border-greyBase/[.4]'>
            <div className='px-4 py-3 lg:px-6 lg:py-5'>
              <div className='relative max-md:w-[254px] md:flex md:flex-row-reverse md:items-center md:justify-between'>
                {isSmallScreens ? (
                  <ControlButtons
                    toggleModal={(e: React.MouseEvent<HTMLButtonElement>) =>
                      toggleModal(e, true, ModalType.ClearLog)
                    }
                  />
                ) : null}
                <h3 className='mb-4 text-2xl font-medium text-darkBase dark:text-whiteBase'>
                  Deleted news
                </h3>
                {archiveHistoryLog?.length > 0 ? (
                  <div>
                    <UnverifiableInput
                      inputData={{
                        name: InputName.DeletedNews,
                        type: InputType.Text,
                        value: searchValue,
                        placeholder: VariantsPlaceholder.FilterByTitle,
                      }}
                      hasIcon={true}
                      svgName={IconName.Search}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleSearchNews(event)
                      }
                    />
                  </div>
                ) : null}
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
                      toggleModal(e, true, ModalType.ClearLog)
                    }
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {isOpenModal && modalType === ModalType.ClearLog && (
        <Modal closeModal={toggleModal} modalRef={popUpRef}>
          <DeleteModal
            handleClose={(e: React.MouseEvent<HTMLButtonElement>) => toggleModal(e)}
            handleDelete={handleClearing}
            title={DeleteModalTitle.Clear}
          />
        </Modal>
      )}
    </>
  );
};

export default ArchiveHistoryLog;
