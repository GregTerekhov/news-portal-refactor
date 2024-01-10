import React from 'react';

const TooManyRequests = () => {
  return (
    <div>
      <h1>429</h1>
      <h2>TOO MANY REQUESTS</h2>
      <p>It seems you have been send too much requests then its needed</p>
      <p>Just wait a bit and refresh the page one more time</p>
      <p>but only one time</p>
    </div>
  );
};

export default TooManyRequests;
