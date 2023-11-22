import React, { FC } from 'react';
import SvgIcon from 'ui/SvgIcon';

const Footer: FC<{}> = () => {
  return (
    <footer className='bg-accentBase/[.7] py-4'>
      <div className='container relative mx-auto px-4'>
        <h2 className='text-whiteBase text-xl mb-2'>Front-end:</h2>
        <ul className='space-y-2 mb-4'>
          <li className='flex items-center gap-6'>
            <p className='text-whiteBase text-small'>Greg Terekhov</p>
            <div className='flex items-center gap-3'>
              <a href='#' className='flex items-center justify-center'>
                <SvgIcon svgName='icon-github' size={20} className='fill-whiteBase' />
              </a>
              <a href='#' className='flex items-center justify-center'>
                <SvgIcon svgName='icon-linkedin' size={20} className='fill-whiteBase' />
              </a>
              <a href='#' className='flex items-center justify-center'>
                <SvgIcon svgName='icon-gmail' size={24} className='fill-whiteBase' />
              </a>
              <a href='#' className='flex items-center justify-center'>
                <SvgIcon svgName='icon-telegram' size={20} className='fill-whiteBase' />
              </a>
            </div>
          </li>
          <li className='flex items-center gap-6'>
            <p className='text-whiteBase text-small'>Max Mordovcev</p>
            <div className='flex items-center gap-3'>
              <a href='#' className='flex items-center justify-center'>
                <SvgIcon svgName='icon-github' size={20} className='fill-whiteBase' />
              </a>
              <a href='#' className='flex items-center justify-center'>
                <SvgIcon svgName='icon-linkedin' size={20} className='fill-whiteBase' />
              </a>
              <a href='#' className='flex items-center justify-center'>
                <SvgIcon svgName='icon-gmail' size={24} className='fill-whiteBase' />
              </a>
              <a href='#' className='flex items-center justify-center'>
                <SvgIcon svgName='icon-telegram' size={20} className='fill-whiteBase' />
              </a>
            </div>
          </li>
        </ul>
        <h2 className='text-whiteBase text-xl mb-2'>Back-end:</h2>
        <ul>
          <li className='flex items-center gap-6'>
            <p className='text-whiteBase text-small'>Dmytro Pavlenko</p>
            <div className='flex items-center gap-3'>
              <a href='#' className='flex items-center justify-center'>
                <SvgIcon svgName='icon-github' size={20} className='fill-whiteBase' />
              </a>
              <a href='#' className='flex items-center justify-center'>
                <SvgIcon svgName='icon-linkedin' size={20} className='fill-whiteBase' />
              </a>
              <a href='#' className='flex items-center justify-center'>
                <SvgIcon svgName='icon-gmail' size={24} className='fill-whiteBase' />
              </a>
              <a href='#' className='flex items-center justify-center'>
                <SvgIcon svgName='icon-telegram' size={20} className='fill-whiteBase' />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
