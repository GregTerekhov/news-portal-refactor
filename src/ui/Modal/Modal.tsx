import React, { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { useWindowWidthContext } from 'contexts';

import SvgIcon from '../SvgIcon/SvgIcon';

const modalRoot = document.querySelector('#modalRoot');

type CloseModalFn = ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
interface ModalProps {
  children: ReactNode;
  closeModal: CloseModalFn;
  modalRef: React.RefObject<HTMLDivElement>;
}

const Modal: FC<ModalProps> = ({ children, closeModal, modalRef }) => {
  const { wideScreens } = useWindowWidthContext();

  const backdropStyles =
    'fixed left-0 top-0 z-100 h-screen flex items-center justify-center w-full mx-auto overflow-auto bg-whiteBase/[.4] backdrop-blur-sm transition-colors before:fixed before:left-0 before:top-0 before:h-81px before:w-full before:content-[""] dark:bg-darkBackground/[.4]';

  const modalContainerStyles =
    'w-full mx-auto transform rounded-xl border border-solid border-accentBase bg-whiteBase px-6 py-4 shadow-modal transition-colors dark:border-whiteBase dark:bg-darkBackground dark:shadow-darkCard md:w-600px md:px-8 md:pb-8 hg:px-9';

  const iconStyles =
    'stroke-darkBase hocus:stroke-accentBase dark:stroke-whiteBase dark:hover:stroke-accentBase dark:focus:stroke-accentBase';

  return (
    <>
      {modalRoot &&
        createPortal(
          <div className={backdropStyles}>
            <div className='flex w-full items-center justify-center max-md:px-10'>
              <div ref={modalRef} className={modalContainerStyles}>
                <button
                  aria-label='Modal close button'
                  className='absolute right-4 top-4 flex items-center justify-center hg:right-5 hg:top-5'
                  onClick={closeModal}
                >
                  <SvgIcon
                    svgName='close'
                    sizeKey={wideScreens ? 'mdIcon28' : 'smIcon20'}
                    className={iconStyles}
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
