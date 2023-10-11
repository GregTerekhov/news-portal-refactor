import React, { useEffect, useState } from 'react';
import { Input, SvgIcon } from 'ui';
import { Menu, ThemeSwitcher, Auth } from 'components';
import { useWindowWidth } from 'hooks';

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isScrollDisabled, setIsScrollDisabled] = useState<boolean>(false);
  const { breakpointsForMarkup } = useWindowWidth() ?? {
    breakpointsForMarkup: null,
  };

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
  }, [isScrollDisabled]);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
    setIsScrollDisabled(!isScrollDisabled);
  };

  return (
    <div
      className={`fixed z-10 w-full top-0 left-0 min-h-[81px] md:min-h-[106px] lg:min-h-[113px] border-b-[1px] border-solid border-line bg-whiteBase opacity-80 ${
        isOpenMenu && 'border-b-0'
      }`}
    >
      <div className='container mx-auto px-4 flex justify-between items-center gap-3.5'>
        <a
          href='/'
          className='sm:py-6 md:pt-8 md:pb-[30px] lg:py-8 text-3xl md:text-4xl lg:text-giant font-bold text-darkBase'
        >
          News
        </a>
        {breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop ? <Menu /> : null}

        {isOpenMenu ? null : (
          <form action='#'>
            <Input name='query' type='text' placeholder='Search |' />
          </form>
        )}
        <button type='button' className='w-6 h-6 md:hidden' onClick={toggleMenu}>
          <SvgIcon
            svgName={`${isOpenMenu ? 'icon-close' : 'icon-burger-menu'}`}
            size={24}
            stroke='#111321'
          />
        </button>

        {breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop ? (
          <div>
            <Auth />
            <ThemeSwitcher />
          </div>
        ) : null}
      </div>

      {isOpenMenu && <Menu isOpen={isOpenMenu} />}
    </div>
  );
};

export default Header;
