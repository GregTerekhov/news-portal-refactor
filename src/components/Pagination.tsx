import React from 'react';
import { PrimaryButton, SvgIcon } from 'ui';
interface P {
  pageNumbers: number[];
  currentPage: number;
  setCurrentPage: (number: number) => void;
}

const Pagination: React.FC<P> = ({ pageNumbers, currentPage, setCurrentPage }) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className='flex justify-center items-center gap-2'>
      <PrimaryButton
        buttonData={{ type: 'button' }}
        variant='OtherButton'
        onHandleClick={handlePrevClick}
      >
        <SvgIcon svgName='icon-arrow-left' size={20} fill='#ffffff' />
        Prev
      </PrimaryButton>
      <ul id='page-numbers' className='flex gap-2'>
        {pageNumbers.map((number: number) => (
          <li
            key={number}
            className={`${number === currentPage ? 'active' : ''}`}
            onClick={() => {
              setCurrentPage(number);
              window.scrollTo(0, 0);
            }}
          >
            <button
              type='button'
              className={`w-10 h-10 border border-solid border-accentBase rounded-[10px] ${
                number === currentPage && 'bg-accentBase text-contrastWhite'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
      <PrimaryButton
        buttonData={{ type: 'button' }}
        variant='OtherButton'
        onHandleClick={handleNextClick}
      >
        Next
        <SvgIcon svgName='icon-arrow-right' size={20} stroke='#ffffff' />
      </PrimaryButton>
    </div>
  );
};

export default Pagination;
