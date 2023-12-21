import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuthRedux } from 'reduxStore/hooks';

import { VotedItem } from 'types';

import { useActiveLinks, usePopUp } from 'hooks';

import { Modal, PlugImage, SvgIcon } from 'ui';

import { useNews } from './hooks';
import { DeleteNewsButton, DeleteNewsModal, NewsDescription, VoteButton } from './subcomponents';

interface NewsItemProps {
  liveNews: Partial<VotedItem>;
}

const NewsItem: FC<Partial<NewsItemProps>> = ({ liveNews = {} }) => {
  const { isAuthenticated } = useAuthRedux();
  const { isOpenModal, toggleModal, popUpRef } = usePopUp();
  const myButtonRef = React.createRef<HTMLButtonElement>();

  // const isAuthenticated = true;
  const location = useLocation();
  const activeLinks = useActiveLinks(location);
  const { isFavourite, hasRead, handleChangeFavourites, handleReadNews, handleDeleteNews } =
    useNews({ liveNews, activeLinks });

  const handleDeleteNewsWrapper = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (liveNews._id) {
      await handleDeleteNews(e, liveNews._id);
    }
  };

  const locationShowHasReadStatus = activeLinks.isHomeActive || activeLinks.isArchiveActive;

  return (
    <>
      {liveNews && liveNews?.newsUrl && (
        <a
          rel='noopener noreferrer'
          className='block group transition-colors duration-500'
          href={liveNews?.newsUrl}
          target='_blank'
          onClick={isAuthenticated ? handleReadNews : undefined}
        >
          <div
            className={`${
              isAuthenticated && hasRead && locationShowHasReadStatus
                ? 'absolute z-20 w-full h-full bg-whiteBase/[.4]'
                : 'hidden'
            }`}
          ></div>
          {activeLinks.isArchiveActive ? (
            <DeleteNewsButton
              myButtonRef={myButtonRef}
              handleOpenConfirm={(e: React.MouseEvent<HTMLButtonElement>) => toggleModal(e, true)}
            />
          ) : null}
          <p className='absolute z-20 top-10 left-0 py-1 px-2 text-small font-medium text-contrastWhite bg-accentBase/[.7] rounded-r'>
            {liveNews?.category} / {liveNews?.materialType}
          </p>
          {isAuthenticated && hasRead && (
            <p className='absolute z-10 top-3.5 right-14 md:top-5 text-base font-bold text-readBase flex items-center gap-1'>
              Already read
              <SvgIcon svgName='icon-check' size={18} className='fill-readBase' />
            </p>
          )}
          <div className='relative h-[395px] flex justify-center items-center overflow-hidden rounded-[10px]'>
            {liveNews && liveNews?.imgLink ? (
              <img
                className='rounded-xl max-w-none h-full absolute object-cover'
                src={liveNews?.imgLink}
                alt={liveNews?.imgAlt ? liveNews?.imgAlt : 'plug image'}
              />
            ) : (
              <PlugImage variant='card' />
            )}
            {isAuthenticated && (
              <>
                <VoteButton
                  onHandleClick={handleChangeFavourites}
                  isFavourite={isFavourite}
                  buttonData={{ id: `Add ${liveNews?.newsUrl} to favourites or remove from them` }}
                />
              </>
            )}
          </div>
          <NewsDescription liveNews={liveNews} />
        </a>
      )}
      {isOpenModal && (
        <Modal closeModal={toggleModal} modalRef={popUpRef} variant='deleteNews'>
          <DeleteNewsModal
            handleDeleteNews={handleDeleteNewsWrapper}
            newsId={liveNews._id}
            handleClose={(e: React.MouseEvent<HTMLButtonElement>) => toggleModal(e)}
          />
        </Modal>
      )}
    </>
  );
};

export default NewsItem;
