import { useCallback, useEffect, useRef, useState } from 'react';

const usePopUp = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isScrollDisabled, setIsScrollDisabled] = useState<boolean>(false);

  const popUpRef = useRef<HTMLDivElement | null>(null);

  const handleWindowClick = useCallback((event: MouseEvent) => {
    if (popUpRef.current && !popUpRef.current.contains(event.target as Node)) {
      setIsOpenModal(false);
      setIsScrollDisabled(false);
    }
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpenModal(false);
      setIsScrollDisabled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousedown', handleWindowClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousedown', handleWindowClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, handleWindowClick, isOpenModal]);

  useEffect(() => {
    if (isScrollDisabled) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // При виході з компонента Menu в мобільній версії скидаємо стиль overflow
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

  return {
    isOpenMenu,
    isOpenModal,
    isScrollDisabled,
    popUpRef,
    toggleMenu,
    toggleModal,
  };
};

export default usePopUp;
