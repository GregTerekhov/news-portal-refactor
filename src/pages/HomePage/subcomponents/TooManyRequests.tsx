import React from 'react';

const TooManyRequests = () => {
  return (
    <div>
      <h1 className='text-[100px] text-center'>429</h1>
      <h2 className='text-center'>TOO MANY REQUESTS</h2>
      <p className='pt-[20px] text-center text-[16px]'>
        It seems you have been send too much requests then its needed. Just wait a bit and refresh
        the page one more time.
      </p>
    </div>
  );
};

export default TooManyRequests;
