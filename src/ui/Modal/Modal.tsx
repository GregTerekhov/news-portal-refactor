import React, { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import FocusLock, { AutoFocusInside } from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';

import { VariantModals } from 'types';
import { ICON_SIZES } from 'constants/iconSizes';
import { usePopUp } from 'hooks';

import SvgIcon from '../SvgIcon';

import { generateModalStyles } from './assistants';

const modalRoot = document.querySelector('#modalRoot');

type CloseModalFn = ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
interface ModalProps {
  children: ReactNode;
  closeModal: CloseModalFn;
  modalRef: React.RefObject<HTMLDivElement>;
  variant: VariantModals;
}

const Modal: FC<ModalProps> = ({ children, closeModal, modalRef, variant }) => {
  const { isOpenModal } = usePopUp();

  const styles = generateModalStyles();
  const currentStyles = styles[variant];

  return (
    <>
      <FocusLock
        disabled={!isOpenModal}
        autoFocus={true}
        returnFocus={{ preventScroll: false }} // не буде працювати в Safari i Edge
      >
        <RemoveScroll enabled={isOpenModal}>
          {modalRoot &&
            createPortal(
              <div className='fixed left-0 top-0 z-[60] flex h-screen w-screen items-center justify-center overflow-auto bg-whiteBase/[.4] backdrop-blur-sm transition-colors duration-500 before:fixed before:left-0 before:top-0 before:h-[81px] before:w-full before:content-[""] dark:bg-darkBackground/[.4]'>
                <div
                  ref={modalRef}
                  className={`absolute left-1/2 w-full -translate-x-1/2 transform bg-whiteBase dark:bg-darkBackground max-md:max-w-[288px] md:w-[600px] ${currentStyles.topPosition} rounded-xl border border-solid border-accentBase px-6 py-4 shadow-modal transition-colors duration-500 dark:border-whiteBase dark:shadow-darkCard md:px-8 md:pb-8`}
                >
                  <AutoFocusInside>
                    <button
                      aria-label='Modal close button'
                      className='absolute right-4 top-4 flex items-center justify-center'
                      onClick={(e) => {
                        document.body.style.overflow = 'auto';
                        closeModal(e);
                      }}
                    >
                      <SvgIcon
                        svgName='icon-close'
                        size={ICON_SIZES.smIcon20}
                        className='stroke-darkBase dark:stroke-whiteBase'
                      />
                    </button>
                  </AutoFocusInside>
                  {children}
                </div>
              </div>,
              modalRoot,
            )}
        </RemoveScroll>
      </FocusLock>
    </>
  );
};

export default Modal;
