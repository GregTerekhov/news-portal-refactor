// import React, { FC, useEffect } from 'react';
// import { PrimaryButton, SvgIcon } from '.';
// import { Dismiss } from 'flowbite';
// import type { DismissOptions, DismissInterface } from 'flowbite';

// interface ToastProps {
//   variant: string;
// }

// const options: DismissOptions = {
//   transition: 'transition-opacity',
//   duration: 1000,
//   timing: 'ease-out',

//   // callback functions
//   onHide: (context, targetEl) => {
//     console.log('element has been dismissed');
//     console.log(targetEl);
//   },
// };

// const Toast: FC<ToastProps> = ({ variant }) => {

//     useEffect(() => {
// const targetEl: HTMLDivElement = document.getElementById('toast-interactive');

//     }, [])
//   const onClick = () => {
//     console.log('Click');
//   };

//   const handleClose = () => {
//     dismiss.hide();
//   };
//   return (
//     <>
//       {variant === 'interactive' && (
//         <div
//           id='toast-interactive'
//           className='w-full max-w-xs p-4 bg-accentAlt/[.8] rounded-lg shadow dark:bg-accentAlt/[.8]'
//           role='alert'
//         >
//           <div className='flex'>
//             <div className='inline-flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg border border-solid'>
//               <SvgIcon svgName='icon-trash' size={20} className='fill-whiteBase' />
//               <span className='sr-only'>Trash icon</span>
//             </div>
//             <div className='ms-3 text-small font-normal'>
//               <span className='mb-1 text-medium lg:text-xl font-medium tracking-wide leading-relaxed text-whiteBase'>
//                 Delete news
//               </span>
//               <div className='mb-2 text-sm font-normal text-whiteBase/[.8] dark:text-greyAlt'>
//                 Are you sure you want to delete this news?
//               </div>
//               <div className='grid grid-cols-2 gap-2'>
//                 <PrimaryButton
//                   buttonData={{ type: 'submit' }}
//                   onHandleClick={handleClose}
//                   variant='OtherButton'
//                   classNameButton='inline-flex justify-center w-full px-2 py-1.5 text-small font-medium text-center text-whiteBase bg-accentBase rounded-lg hover:bg-accentAlt focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:hover:border-greyBase'
//                 >
//                   Delete
//                 </PrimaryButton>
//                 <PrimaryButton
//                   onHandleClick={onClick}
//                   variant='OtherButton'
//                   classNameButton='inline-flex justify-center w-full px-2 py-1.5 text-small font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-greyBase dark:text-whiteBase dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700'
//                 >
//                   Not now
//                 </PrimaryButton>
//               </div>
//             </div>
//             <button
//               type='button'
//               className='ms-auto -mx-1.5 -my-1.5 bg-transparent group flex items-center justify-center flex-shrink-0 rounded-lg focus:ring-2 focus:ring-greyIcon p-1.5 hover:bg-whiteBase/[.2] h-8 w-8  transition-colors duration-500'
//               data-dismiss-target='#toast-interactive'
//               aria-label='Close'
//             >
//               <span className='sr-only'>Close</span>
//               <SvgIcon svgName='icon-close' size={20} className='stroke-whiteBase' />
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// const dismiss: DismissInterface = new Dismiss(targetEl, options);

// export default Toast;
