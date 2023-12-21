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
        className='bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_"title_action"_"description_action"] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut'
      >
        <Toast.Title className='[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]'>
          {title}
        </Toast.Title>
        <Toast.Description className='[grid-area:_description] m-0 text-slate11 text-[13px] leading-[1.3]'>
          {description}
        </Toast.Description>
        <Toast.Action className='[grid-area:_action]' asChild altText='Goto schedule to undo'>
          <button className='inline-flex items-center justify-center rounded-[10px] font-medium bg-accentBase text-whiteBase hover:bg-accentAlt transition-colors duration-500 text-small px-[10px] leading-[25px] h-[25px] bg-green2 text-green11 shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8'>
            Undo
          </button>
        </Toast.Action>
      </Toast.Root>

      <Toast.Viewport className='[--viewport-padding:_25px] fixed top-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none' />
    </>
  );
};

export default Notification;
