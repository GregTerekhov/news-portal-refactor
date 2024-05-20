import { useCallback, useEffect, useRef, useState } from 'react';

import { ModalType } from 'types';

import { useModalStateContext, useScrollBodyContext } from 'contexts';

const usePopUp = () => {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [isOpenModalForItem, setIsOpenModalForItem] = useState(false);
  const popUpRef = useRef<HTMLDivElement | null>(null);

  const { isScrollDisabled, setIsScrollDisabled } = useScrollBodyContext();
  const { isOpenModal, setModalType, setIsOpenModal } = useModalStateContext();

  const handleWindowClick = useCallback(
    (event: MouseEvent): void => {
      if (popUpRef.current && !popUpRef.current.contains(event.target as Node)) {
        if (isOpenModal) {
          setIsOpenModal(false);
          setModalType(ModalType.Unknown);
          setIsScrollDisabled(false);
        }
        if (isOpenCalendar) {
          setIsOpenCalendar(false);
        }
      }
    },
    [isOpenModal, isOpenCalendar],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        if (isOpenModal) {
          setIsOpenModal(false);
          setModalType(ModalType.Unknown);
          setIsScrollDisabled(false);
        }
        if (isOpenCalendar) {
          setIsOpenCalendar(false);
        }
      }
    },
    [isOpenCalendar, isOpenModal],
  );

  useEffect(() => {
    window.addEventListener('mousedown', handleWindowClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousedown', handleWindowClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, handleWindowClick, isOpenModal, isOpenCalendar]);

  const toggleCalendar = useCallback(() => {
    setIsOpenCalendar(!isOpenCalendar);
  }, [isOpenCalendar]);

  const toggleModal = (
    e?: React.MouseEvent<HTMLButtonElement>,
    preventDefault: boolean = true,
    type?: ModalType,
    id?: string,
    liveNewsId?: string,
  ): void => {
    if (preventDefault) {
      e?.preventDefault();
      e?.stopPropagation();
    }
    setIsOpenModalForItem(id === liveNewsId);

    !isOpenModal && type ? setModalType(type) : setModalType(ModalType.Unknown);

    setIsOpenModal(!isOpenModal);
    setIsScrollDisabled(!isScrollDisabled);
  };

  return {
    isOpenModalForItem,
    isOpenCalendar,
    popUpRef,
    setIsOpenCalendar,
    toggleModal,
    toggleCalendar,
  };
};

export default usePopUp;
