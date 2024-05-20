import React, { FC } from 'react';

import { LinkAccountsButtons } from 'ui';

const ThirdPartyAuthPanel: FC = () => {
  return (
    <>
      <div className='relative z-20 mb-6 flex items-center justify-center'>
        <span className='relative z-30 rounded-xl border border-solid border-greyAlt/[.4] bg-whiteBase/[.9] px-2 text-small text-greyAlt transition-colors duration-500 dark:bg-darkBackground dark:text-whiteBase/[.8] hg:px-4 hg:text-medium'>
          or Sign in with
        </span>
        <hr className='absolute left-0 top-1/2 h-px w-full bg-greyAlt opacity-60 dark:bg-whiteBase/[.1] dark:opacity-20' />
      </div>
      <LinkAccountsButtons />
    </>
  );
};

export default ThirdPartyAuthPanel;
