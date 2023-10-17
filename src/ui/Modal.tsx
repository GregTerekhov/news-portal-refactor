import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import SvgIcon from './SvgIcon';

const modalRoot = document.querySelector('#modalRoot');

interface ModalProps {
  children: ReactNode;
  closeModal: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
  variant: S;
}

export enum S {
  Auth = 'auth',
  News = 'news',
}

const Modal: React.FC<ModalProps> = ({ children, closeModal, modalRef, variant }) => {
  let modalWidth: string = '';

  if (variant === S.Auth) {
    modalWidth = 'w-full preMd:max-w-[288px] md:w-[600px]';
  } else if (variant === S.News) {
    modalWidth = 'w-full';
  }

  return (
    <>
      {modalRoot &&
        createPortal(
          <div className='fixed top-0 left-0 z-2000 bg-foreground w-screen h-screen flex justify-center items-center'>
            <div
              ref={modalRef}
              className={`relative bg-whiteBase ${modalWidth} px-4 pb-4 border border-solid border-accentBase rounded-xl shadow-modal md:px-8 md:pb-8 md:pt-4`}
            >
              <button
                className='absolute top-4 right-4 flex justify-center items-center'
                onClick={closeModal}
              >
                <SvgIcon svgName='icon-close' size={16} stroke='#111321' />
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
