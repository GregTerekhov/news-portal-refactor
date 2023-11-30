import { ThemeSwitcher } from 'components/index';
import React, { FC } from 'react';
import { redirect } from 'react-router-dom';
// import { selectIsLoggedIn } from 'reduxStore/auth';
// import { useAppSelector } from 'reduxStore/hooks';
// import PrimaryButton from 'ui/PrimaryButton';

const ErrorPage: FC<{}> = () => {
  // const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isLoggedIn = true;

  const onHandleClick = () => {
    console.log(`2`);
    return redirect('/');
  };

  console.log(isLoggedIn);

  return (
    <section className='container mx-auto px-4 hg:px-[65px] text-center'>
      <div className='w-[150px] ml-auto'>
        <ThemeSwitcher />
      </div>
      <img className='m-auto' src='src\assets\images\ErrorPagePNG.png' alt='errorPage' />
      <h1 className='text-7xl mt-10 mb-10'>Page not found</h1>
      <p className='block text-3xl m-auto w-[900px]  mb-10'>
        Looks like you'we lost a bit. The page you requested could not be found or maybe don't even
        exist. How about to make a step back and try again?
      </p>
      {/* <PrimaryButton variant='' /> */}
      <div className='flex items-center justify-center gap-5'>
        {isLoggedIn && (
          <button
            className='uppercase px-5 py-2 bg-accentBase rounded-full border-solid text-whiteBase'
            type='button'
          >
            Go back
          </button>
        )}
        <button
          className='uppercase px-5 py-2 bg-accentBase rounded-full border-solid text-whiteBase'
          onClick={onHandleClick}
          type='button'
        >
          {isLoggedIn ? 'Or Go Home' : 'Just Go Home'}
        </button>
      </div>
    </section>
  );
};

export default ErrorPage;
