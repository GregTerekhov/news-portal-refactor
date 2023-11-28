import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { setTokens } from 'reduxStore/auth';

const usePopUp = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [changePasswordToken, setChangePasswordToken] = useState<boolean>(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [isScrollDisabled, setIsScrollDisabled] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const popUpRef = useRef<HTMLDivElement | null>(null);

  const token = searchParams.get('token');
  const openModal = searchParams.get('openModal');

  useEffect(() => {
    if (token && openModal) {
      setChangePasswordToken(true);
      setTokens({ accessToken: token, refreshToken: null });
      setIsOpenModal(true);
    }
    setChangePasswordToken(false);
    setIsOpenModal(false);
  }, [searchParams]);

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
    isOpenMenu,
    isOpenModal,
    changePasswordToken,
    isOpenCalendar,
    isScrollDisabled,
    popUpRef,
    setIsOpenCalendar,
    toggleMenu,
    toggleModal,
    toggleCalendar,
  };
};

export default usePopUp;
