import React, { FC } from 'react';

import { useAuthRedux } from 'reduxStore/hooks';

import { VariantModals, VotedItem } from 'types';

import { ICON_SIZES } from 'constants/iconSizes';
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

  const { isHomeActive, isArchiveActive } = useActiveLinks();

  const { isFavourite, hasRead, handleChangeFavourites, handleReadNews, handleDeleteNews } =
    useNews({ liveNews, isArchiveActive });

  const handleDeleteNewsWrapper = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> => {
    if (liveNews._id) {
      toggleModal;
      await handleDeleteNews(e, liveNews._id);
    }
  };

  const locationShowHasReadStatus = isHomeActive || isArchiveActive;

  return (
    <>
      {liveNews && liveNews?.newsUrl && (
        <a
          rel='noopener noreferrer'
          className='group block transition-colors duration-500'
          href={liveNews?.newsUrl}
          target='_blank'
          onClick={isAuthenticated ? handleReadNews : undefined}
        >
          <div
            className={`${
              isAuthenticated && hasRead && locationShowHasReadStatus
                ? 'absolute z-20 h-full w-full bg-whiteBase/[.4]'
                : 'hidden'
            }`}
          ></div>
          {isArchiveActive ? (
            <DeleteNewsButton
              myButtonRef={myButtonRef}
              handleOpenConfirm={(e: React.MouseEvent<HTMLButtonElement>) => toggleModal(e, true)}
            />
          ) : null}
          <p className='absolute left-0 top-10 z-20 rounded-r bg-accentBase/[.7] px-2 py-1 text-small font-medium text-contrastWhite'>
            {liveNews?.category} / {liveNews?.materialType}
          </p>
          {isAuthenticated && hasRead && (
            <p className='absolute right-14 top-3.5 z-10 flex items-center gap-1 text-base font-bold text-readBase md:top-5'>
              Already read
              <SvgIcon svgName='icon-check' size={ICON_SIZES.smIcon18} className='fill-readBase' />
            </p>
          )}
          <div className='relative flex h-395px items-center justify-center overflow-hidden rounded-[10px]'>
            {liveNews && liveNews?.imgLink ? (
              <img
                className='absolute h-full max-w-none rounded-xl object-cover'
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
        <Modal closeModal={toggleModal} modalRef={popUpRef} variant={VariantModals.DeleteNews}>
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
