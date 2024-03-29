import { useCallback, useEffect, useRef, useState } from 'react';

import { useScrollBodyContext } from 'contexts';

const usePopUp = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);

  const { isScrollDisabled, setIsScrollDisabled } = useScrollBodyContext();

  const popUpRef = useRef<HTMLDivElement | null>(null);

  const handleWindowClick = useCallback(
    (event: MouseEvent) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target as Node)) {
        if (isOpenModal) {
          setIsOpenModal(false);
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
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isOpenModal) {
          setIsOpenModal(false);
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

  const toggleModal = (e?: React.MouseEvent<HTMLButtonElement>, preventDefault: boolean = true) => {
    if (preventDefault) {
      e?.preventDefault();
      e?.stopPropagation();
    }

    setIsOpenModal(!isOpenModal);
    setIsScrollDisabled(!isScrollDisabled);
  };

  return {
    isOpenModal,
    isOpenCalendar,
    popUpRef,
    setIsOpenModal,
    setIsOpenCalendar,
    toggleModal,
    toggleCalendar,
  };
};

export default usePopUp;
