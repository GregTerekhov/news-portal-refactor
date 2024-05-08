import React, { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { useWindowWidthContext } from 'contexts';

import SvgIcon from '../SvgIcon/SvgIcon';

import { modalStyles } from './assistants';

const modalRoot = document.querySelector('#modalRoot');

type CloseModalFn = ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
interface ModalProps {
  children: ReactNode;
  closeModal: CloseModalFn;
  modalRef: React.RefObject<HTMLDivElement>;
}

const Modal: FC<ModalProps> = ({ children, closeModal, modalRef }) => {
  const { isWideScreens } = useWindowWidthContext();

  const { backdrop, container, icon } = modalStyles;

  return (
    <>
      {modalRoot &&
        createPortal(
          <div className={backdrop}>
            <div className='flex w-full items-center justify-center max-md:px-10'>
              <div ref={modalRef} className={container}>
                <button
                  aria-label='Modal close button'
                  className='absolute right-4 top-4 flex items-center justify-center hg:right-5 hg:top-5'
                  onClick={closeModal}
                >
                  <SvgIcon
                    svgName='close'
                    sizeKey={isWideScreens ? 'mdIcon28' : 'smIcon20'}
                    className={icon}
                  />
                </button>
                {children}
              </div>
            </div>
          </div>,
          modalRoot,
        )}
    </>
  );
};

export default Modal;
