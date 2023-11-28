import React, { FC, useState } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const Hero: FC<{}> = () => {
  const [isVideoPlaying, setVideoPlaying] = useState<boolean>(false);

  const playerStyle = `h-16 md:h-20 w-16 md:w-20 rounded-xl shadow-darkCard border border-solid border-greyAlt/[.4] bg-whiteBase/[.9] bg-[url('/src/assets/images/right-button-100.png')] bg-center ${
    isVideoPlaying ? 'hidden' : ''
  }`;

  return (
    <div className='w-full h-auto overflow-hidden flex items-center justify-center -mt-[81px] md:-mt-[106px] lg:-mt-[113px'>
      <LiteYouTubeEmbed
        id='_-EknzllWXI'
        title='YouTube video player'
        params='t=1s&ab_channel=TheNewYorkTimes'
        wrapperClass='w-full h-screen  bg-no-repeat bg-cover bg-center flex items-center justify-center'
        adNetwork={true}
        iframeClass='w-full h-screen'
        aspectWidth={window.innerWidth}
        aspectHeight={window.innerHeight}
        playlist={false}
        poster='maxresdefault'
        playerClass={playerStyle}
        onIframeAdded={() => setVideoPlaying(true)}
      />
    </div>
  );
};

export default Hero;
