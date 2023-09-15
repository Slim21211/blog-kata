import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchFavoriteArticle } from '../../Redux/Actions/fetch-favorite-article-action';
import { fetchUnfavoriteArticle } from '../../Redux/Actions/fetch-unfavorite-article-action';

import styles from './like.module.scss';

const Like = ({ favorite: initialFavorite, favoritesCount: initialCount, slug }) => {
  const { 'like-image': LikeImage, 'like-image-favorited': LikeImageFavorited, 'like-count': LikeCount } = styles;

  const [isFavorited, setIsFavorited] = useState(initialFavorite);
  const [isFavoritesCount, setIsFavoritesCount] = useState(initialCount);

  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const onToggleFavorite = async () => {
    if (token !== null) {
      if (!isFavorited) {
        await dispatch(fetchFavoriteArticle(slug, token));
        setIsFavoritesCount(isFavoritesCount + 1);
      } else {
        await dispatch(fetchUnfavoriteArticle(slug, token));
        setIsFavoritesCount(isFavoritesCount - 1);
      }
      setIsFavorited(!isFavorited);
    }
  };
  return (
    <>
      <div className={!isFavorited ? LikeImage : LikeImageFavorited} onClick={onToggleFavorite}></div>
      <span className={LikeCount}>{isFavoritesCount}</span>
    </>
  );
};

export default Like;
