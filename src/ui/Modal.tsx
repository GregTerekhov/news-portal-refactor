import React, { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import SvgIcon from './SvgIcon';

const modalRoot = document.querySelector('#modalRoot');

interface ModalProps {
  children: ReactNode;
  closeModal: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
  variant: string;
}

enum S {
  Auth = 'auth',
  Weather = 'weather',
}

const Modal: FC<ModalProps> = ({ children, closeModal, modalRef, variant }) => {
  let modalWidth: string = '';

  if (variant === S.Auth) {
    modalWidth = 'w-full max-md:max-w-[288px] md:w-[600px]';
  } else if (variant === S.Weather) {
    modalWidth = 'w-full';
  }

  return (
    <>
      {modalRoot &&
        createPortal(
          <div className='fixed top-0 left-0 z-[60] bg-whiteBase/[.4] dark:bg-darkBackground/[.4] w-screen h-screen flex justify-center items-center transition-colors duration-500 backdrop-blur-sm'>
            <div
              ref={modalRef}
              className={`relative bg-whiteBase dark:bg-darkBackground ${modalWidth} p-4 border border-solid border-accentBase dark:border-whiteBase rounded-xl shadow-modal dark:shadow-darkCard md:px-8 md:pb-8 transition-colors duration-500`}
            >
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

              {children}
            </div>
          </div>,
          modalRoot,
        )}
    </>
  );
};

export default Modal;
