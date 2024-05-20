export const notificationStyles = {
  root: 'data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=end]:animate-swipeOut grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-whiteBase p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_"title_action"_"description_action"] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:transition-[transform_200ms_ease-out] dark:border dark:border-whiteBase dark:bg-darkBackground',
  itemTitle:
    'mb-[5px] text-[15px] font-medium text-darkBase [grid-area:_title] dark:text-whiteBase',
  itemDescription:
    'm-0 text-[10px] md:text-[13px] leading-[1.3] text-darkBase [grid-area:_description] dark:text-whiteBase',
  undoButton:
    'inline-flex h-25px items-center justify-center rounded-[10px] bg-accentBase px-[10px] text-small font-medium leading-[25px] text-whiteBase shadow-[inset_0_0_0_1px] transition-colors duration-500 hocus:bg-accentAlt hover:shadow-[inset_0_0_0_1px] focus:shadow-[0_0_0_2px]',
  viewport:
    'max-w-screen fixed right-0 top-0 z-[2147483647] m-0 flex w-[320px] md:w-390px list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]',
};
