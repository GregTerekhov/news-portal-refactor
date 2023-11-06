import { startOfToday } from 'date-fns';
import { useCallback, useEffect, useRef, useState } from 'react';

const usePopUp = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [isScrollDisabled, setIsScrollDisabled] = useState<boolean>(false);
  const today = startOfToday();

  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  const popUpRef = useRef<HTMLDivElement | null>(null);

  const handleWindowClick = useCallback(
    (event: MouseEvent) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target as Node)) {
        if (isOpenModal) {
          setIsOpenModal(false);
          setIsScrollDisabled(false);
        }
        if (isOpenCalendar) {
          //
          setIsOpenCalendar(false);
          setSelectedDate(today);
          // setBeginDate(null);
        }
      }
    },
    [isOpenModal, isOpenCalendar],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isOpenModal) {
          //
          setIsOpenModal(false);
          setIsScrollDisabled(false);
        }
        if (isOpenCalendar) {
          //
          setIsOpenCalendar(false);
          setSelectedDate(today);
          // setBeginDate(null);
        }
      }
    },
    [isOpenModal, isOpenCalendar],
  );

  useEffect(() => {
    window.addEventListener('mousedown', handleWindowClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousedown', handleWindowClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, handleWindowClick, isOpenModal, isOpenCalendar]);

  useEffect(() => {
    if (isScrollDisabled) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isScrollDisabled, isOpenModal]);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
    setIsScrollDisabled(!isScrollDisabled);
  };

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
    setIsScrollDisabled(!isScrollDisabled);
  };

  const toggleCalendar = () => {
    setIsOpenCalendar(!isOpenCalendar);
  };

  return {
    today,
    selectedDate,
    setSelectedDate,
    isOpenMenu,
    isOpenModal,
    isOpenCalendar,
    setIsOpenCalendar,
    isScrollDisabled,
    popUpRef,
    toggleMenu,
    toggleModal,
    toggleCalendar,
  };
};

export default usePopUp;
