import React, { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { RemoveScroll } from 'react-remove-scroll';

import { useWindowWidth } from 'contexts';
import { usePopUp } from 'hooks';

import SvgIcon from '../SvgIcon';

const modalRoot = document.querySelector('#modalRoot');

type CloseModalFn = ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
interface ModalProps {
  children: ReactNode;
  closeModal: CloseModalFn;
  modalRef: React.RefObject<HTMLDivElement>;
}

const Modal: FC<ModalProps> = ({ children, closeModal, modalRef }) => {
  const { isOpenModal } = usePopUp();
  const { wideScreens } = useWindowWidth();

  const backdropStyles =
    'fixed left-0 top-0 z-100 flex h-screen w-screen items-center justify-center overflow-auto bg-whiteBase/[.4] backdrop-blur-sm transition-colors before:fixed before:left-0 before:top-0 before:h-81px before:w-full before:content-[""] dark:bg-darkBackground/[.4]';

  const modalContainerStyles =
    'absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform rounded-xl border border-solid border-accentBase bg-whiteBase px-6 py-4 shadow-modal transition-colors dark:border-whiteBase dark:bg-darkBackground dark:shadow-darkCard max-md:max-w-[288px] md:w-600px md:px-8 md:pb-8 hg:px-9';

  return (
    <>
      <RemoveScroll enabled={isOpenModal}>
        {modalRoot &&
          createPortal(
            <div className={`${backdropStyles}`}>
              <div ref={modalRef} className={`${modalContainerStyles}`}>
                <button
                  aria-label='Modal close button'
                  className='absolute right-4 top-4 flex items-center justify-center hg:right-5 hg:top-5'
                  onClick={closeModal}
                >
                  <SvgIcon
                    svgName='close'
                    sizeKey={wideScreens ? 'mdIcon28' : 'smIcon20'}
                    className='stroke-darkBase hover:stroke-accentBase dark:stroke-whiteBase dark:hover:stroke-accentBase'
                  />
                </button>
                {children}
              </div>
            </div>,
            modalRoot,
          )}
      </RemoveScroll>
    </>
  );
};

export default Modal;
