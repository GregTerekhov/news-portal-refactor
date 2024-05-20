import React, { FC } from 'react';

import {
  DeleteModalTitle,
  IconName,
  IconSizes,
  ModalType,
  VariantPlug,
  type VotedItem,
} from 'types';
import { useAuthRedux } from 'reduxStore/hooks';
import { useModalStateContext } from 'contexts';

import { useActiveLinks, usePopUp } from 'hooks';

import { DeleteModal, Modal, PlugImage, SvgIcon } from 'ui';
import { DeleteNewsButton, NewsDescription, VoteButton } from './subcomponents';

import { useNews } from './hooks';

interface INewsItemProps {
  liveNews: Partial<VotedItem>;
}

const NewsItem: FC<Partial<INewsItemProps>> = ({ liveNews = {} }) => {
  const myButtonRef = React.createRef<HTMLButtonElement>();

  const { isAuthenticated } = useAuthRedux();
  const { isOpenModal, modalType } = useModalStateContext();

  const { toggleModal, popUpRef, isOpenModalForItem } = usePopUp();
  const { isHomeActive, isArchiveActive, isFavoriteActive } = useActiveLinks();
  const { isFavourite, hasRead, handleReadNews, handleDeleteNews } = useNews({
    liveNews,
  });

  const { _id, newsUrl, category, materialType, edition, imgLink, imgAlt, title } = liveNews;

  //Функція видалення новини
  const handleDeleteNewsWrapper = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id?: string,
  ): Promise<void> => {
    if (id) {
      toggleModal();
      await handleDeleteNews(e, id);
    }
  };

  const showHasReadStatus =
    isAuthenticated && hasRead && (isHomeActive || isArchiveActive || isFavoriteActive);

  const shouldShowModal =
    isOpenModal &&
    isOpenModalForItem &&
    isAuthenticated &&
    modalType === ModalType.DeleteNews &&
    _id;

  return (
    liveNews && (
      <>
        {newsUrl && (
          <a
            rel='noopener noreferrer nofollow'
            className='group block transition-all'
            href={newsUrl}
            target='_blank'
            onClick={isAuthenticated ? handleReadNews : undefined}
            aria-label='Click to read current news'
          >
            <div
              className={`${
                showHasReadStatus ? 'absolute z-20 h-full w-full bg-whiteBase/[.4]' : 'hidden'
              }`}
            ></div>
            {isArchiveActive ? (
              <DeleteNewsButton
                myButtonRef={myButtonRef}
                handleOpenConfirm={(e: React.MouseEvent<HTMLButtonElement>) =>
                  toggleModal(e, true, ModalType.DeleteNews)
                }
              />
            ) : null}
            <p className='absolute left-0 top-10 z-20 rounded-r bg-accentBase/[.7] px-2 py-1 text-small font-medium text-contrastWhite hg:text-medium'>
              {category} / {materialType}
            </p>
            {showHasReadStatus ? (
              <p className='absolute right-14 top-3.5 z-10 flex items-center gap-1 text-base font-bold text-readBase md:top-5'>
                Already read
                <SvgIcon
                  svgName={IconName.Check}
                  sizeKey={IconSizes.smIcon18}
                  className='fill-readBase'
                />
              </p>
            ) : null}
            <div className='relative flex h-395px items-center justify-center overflow-hidden rounded-[10px]'>
              <p className='absolute bottom-3 left-3 z-10 text-whiteBase opacity-0 drop-shadow-lg transition-opacity group-hover:opacity-100'>
                {edition}
              </p>
              {imgLink ? (
                <img
                  loading='lazy'
                  className='absolute h-full max-w-none rounded-xl object-cover'
                  src={imgLink}
                  alt={imgAlt ? imgAlt : 'plug image'}
                />
              ) : (
                <PlugImage variant={VariantPlug.Card} />
              )}
              {isAuthenticated && (
                <VoteButton
                  liveNews={liveNews}
                  isFavourite={isFavourite}
                  id={`Add ${title ?? ''} to favourites or remove from them`}
                />
              )}
            </div>
            <NewsDescription liveNews={liveNews} />
          </a>
        )}
        {shouldShowModal && (
          <Modal closeModal={toggleModal} modalRef={popUpRef}>
            <DeleteModal
              handleClose={(e: React.MouseEvent<HTMLButtonElement>) => toggleModal(e)}
              handleDelete={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                handleDeleteNewsWrapper(e, _id)
              }
              title={DeleteModalTitle.Delete}
            />
          </Modal>
        )}
      </>
    )
  );
};

export default NewsItem;
