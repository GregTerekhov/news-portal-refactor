// import { useSelectedDate } from 'contexts/SelectedDateProvider';
import { useCallback, useEffect, useRef, useState } from 'react';

const usePopUp = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [isScrollDisabled, setIsScrollDisabled] = useState<boolean>(false);

  const popUpRef = useRef<HTMLDivElement | null>(null);

  // const { isOpenCalendar, setIsOpenCalendar } = useSelectedDate();

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
        }
        if (isOpenCalendar) {
          setIsOpenCalendar(false);
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
  }, [isScrollDisabled]);

  const toggleModal = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, preventDefault: boolean = true) => {
      if (preventDefault) {
        e.preventDefault();
        e.stopPropagation();
      }

      setIsOpenModal(!isOpenModal);
      setIsScrollDisabled(!isScrollDisabled);
    },
    [isOpenModal, isScrollDisabled],
  );

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
    setIsScrollDisabled(!isScrollDisabled);
  };

  const toggleCalendar = () => {
    console.log('toggle', isOpenCalendar);
    setIsOpenCalendar(!isOpenCalendar);
  };

  return {
    isOpenMenu,
    isOpenModal,
    isOpenCalendar,
    isScrollDisabled,
    popUpRef,
    setIsOpenModal,
    setIsOpenCalendar,
    toggleMenu,
    toggleModal,
    toggleCalendar,
  };
};

export default usePopUp;
