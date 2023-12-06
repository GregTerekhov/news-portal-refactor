import React, { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import FocusLock, { AutoFocusInside } from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';

import SvgIcon from './SvgIcon';
import usePopUp from 'hooks/usePopUp';

const modalRoot = document.querySelector('#modalRoot');

interface ModalProps {
  children: ReactNode;
  closeModal: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
  variant: string;
}

enum S {
  Auth = 'auth',
}

const Modal: FC<ModalProps> = ({ children, closeModal, modalRef, variant }) => {
  const { isOpenModal } = usePopUp();
  let modalWidth: string = '';

  if (variant === S.Auth) {
    modalWidth = 'w-full max-md:max-w-[288px] md:w-[600px]';
  }

  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === 'Tab') {
  //       const focusableElements = modalRef.current?.querySelectorAll(
  //         'button, [href], input, [tabindex]:not([tabindex="-1"])',
  //       ) as NodeListOf<HTMLElement>;
  //       console.log('focusableElements', focusableElements);

  //       if (focusableElements.length > 0) {
  //         const firstElement = focusableElements[0];
  //         const lastElement = focusableElements[focusableElements.length - 1];
  //         console.log('document.activeElement', document.activeElement);

  //         if (!event.shiftKey && document.activeElement === lastElement) {
  //           firstElement.focus();
  //           event.preventDefault();
  //         } else if (event.shiftKey && document.activeElement === firstElement) {
  //           lastElement.focus();
  //           event.preventDefault();
  //         }
  //       }
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [modalRef]);

  return (
    <>
      <FocusLock
        disabled={!isOpenModal}
        autoFocus={true}
        returnFocus={{ preventScroll: false }} // не буде працювати в Safari i Edge
      >
        <RemoveScroll>
          {modalRoot &&
            createPortal(
              <div className='fixed top-0 left-0 z-[60] bg-whiteBase/[.4] dark:bg-darkBackground/[.4] w-screen h-screen flex justify-center items-center transition-colors duration-500 backdrop-blur-sm'>
                <div
                  ref={modalRef}
                  className={`relative bg-whiteBase dark:bg-darkBackground ${modalWidth} py-4 px-6 border border-solid border-accentBase dark:border-whiteBase rounded-xl shadow-modal dark:shadow-darkCard md:px-8 md:pb-8 transition-colors duration-500`}
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
