import React, { FC } from 'react';
import * as Toast from '@radix-ui/react-toast';

interface ToastProps {
  variant?: string;
  title: string;
  description: string;
  openToast: boolean;
  setOpenToast: (value: boolean) => void;
}

const Notification: FC<ToastProps> = ({ variant, title, description, openToast, setOpenToast }) => {
  return (
    <>
      <Toast.Root
        type={variant === 'non-interactive' ? 'background' : 'foreground'}
        open={openToast}
        defaultOpen={variant === 'non-interactive' ? true : false}
        onOpenChange={(isOpen) => setOpenToast(isOpen)}
        className='data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=end]:animate-swipeOut grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-whiteBase p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_"title_action"_"description_action"] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:transition-[transform_200ms_ease-out] dark:border dark:border-whiteBase dark:bg-darkBackground'
      >
        <Toast.Title className='mb-[5px] text-[15px] font-medium text-darkBase [grid-area:_title] dark:text-whiteBase'>
          {title}
        </Toast.Title>
        <Toast.Description className='m-0 text-[13px] leading-[1.3] text-darkBase [grid-area:_description] dark:text-whiteBase'>
          {description}
        </Toast.Description>
        <Toast.Action className='[grid-area:_action]' asChild altText='Goto schedule to undo'>
          <button className='bg-green2 text-green11 shadow-green7 hover:shadow-green8 focus:shadow-green8 h-25px inline-flex items-center justify-center rounded-[10px] bg-accentBase px-[10px] text-small font-medium leading-[25px] text-whiteBase shadow-[inset_0_0_0_1px] transition-colors duration-500 hover:bg-accentAlt hover:shadow-[inset_0_0_0_1px] focus:shadow-[0_0_0_2px]'>
            Undo
          </button>
        </Toast.Action>
      </Toast.Root>

      <Toast.Viewport className='max-w-screen w-390px fixed right-0 top-0 z-[2147483647] m-0 flex list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]' />
    </>
  );
};

export default Notification;
