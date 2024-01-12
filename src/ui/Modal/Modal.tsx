import React, { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import FocusLock, { AutoFocusInside } from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';

import { usePopUp } from 'hooks';

import SvgIcon from '../SvgIcon';

import { generateModalStyles } from './assistants';

const modalRoot = document.querySelector('#modalRoot');

type CloseModalFn = ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
interface ModalProps {
  children: ReactNode;
  closeModal: CloseModalFn;
  modalRef: React.RefObject<HTMLDivElement>;
  variant: string;
}

export enum VariantModals {
  Auth = 'auth',
  DeleteNews = 'deleteNews',
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
              <div className='fixed before:fixed before:content-[""] before:w-full before:h-[81px] before:top-0 before:left-0 top-0 left-0 z-[60] bg-whiteBase/[.4] dark:bg-darkBackground/[.4] w-screen h-screen flex justify-center items-center transition-colors duration-500 backdrop-blur-sm overflow-auto'>
                <div
                  ref={modalRef}
                  className={`absolute left-1/2 w-full max-md:max-w-[288px] md:w-[600px] transform -translate-x-1/2 bg-whiteBase dark:bg-darkBackground ${currentStyles.topPosition} py-4 px-6 border border-solid border-accentBase dark:border-whiteBase rounded-xl shadow-modal dark:shadow-darkCard md:px-8 md:pb-8 transition-colors duration-500`}
                >
                  <AutoFocusInside>
                    <button
                      aria-label='Modal close button'
                      className='absolute top-4 right-4 flex justify-center items-center'
                      onClick={closeModal}
                    >
                      <SvgIcon
                        svgName='icon-close'
                        size={20}
                        className='stroke-darkBase dark:stroke-whiteBase hover:rotate-90 transition-transform'
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
