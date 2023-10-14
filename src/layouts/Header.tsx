import React, { useEffect, useState } from 'react';
import { Input, SvgIcon } from 'ui';
import { Menu, ThemeSwitcher, Auth } from 'components';
import { useWindowWidth } from 'hooks';
import { V } from 'ui/Input';

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

  const inNotMobile = breakpointsForMarkup?.isTablet || breakpointsForMarkup?.isDesktop;

  return (
    <div
      className={`fixed z-10 w-full top-0 left-0 min-h-[81px] md:min-h-[106px] lg:min-h-[113px]  border-solid border-line bg-foregroundLight  ${
        isOpenMenu ? 'border-b-0' : 'border-b-[1px]'
      }`}
    >
      <div className='container mx-auto px-4 flex justify-between items-center gap-3.5'>
        <a
          href='/'
          className='sm:py-6 md:pt-8 md:pb-[30px] lg:py-7 text-3xl leading-tight lg:leading-[1.357144] md:text-4xl lg:text-giant font-bold text-darkBase'
        >
          News
        </a>
        {inNotMobile ? <Menu /> : null}

        {isOpenMenu ? null : (
          <form action='#'>
            <Input
              inputData={{ name: 'query', type: 'text', placeholder: 'Search |' }}
              hasIcon={true}
              variant={V.Header}
            />
          </form>
        )}
        <button type='button' className='w-6 h-6 md:hidden' onClick={toggleMenu}>
          <SvgIcon
            svgName={`${isOpenMenu ? 'icon-close' : 'icon-burger-menu'}`}
            size={24}
            stroke='#111321'
          />
        </button>

        {inNotMobile ? (
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
