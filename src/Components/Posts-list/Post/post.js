import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchFavoriteArticle } from '../../../Redux/Actions/fetch-favorite-article-action';
import { fetchUnfavoriteArticle } from '../../../Redux/Actions/fetch-unfavorite-article-action';
import { fetchArticlesAuth } from '../../../Redux/Actions/fetch-articles-action';
import noAvatar from '../../../Assets/Noavatar.png';

import styles from './post.module.scss';

const Post = ({ title, tagList, user, date, description, avatar, likes, slug, favorited, offset }) => {
  const {
    'post-wrapper': postWrapper,
    'post-header-wrapper': postHeaderWrapper,
    'post-description': postDescription,
    'post-title-wrapper': postTitleWrapper,
    'post-user-wrapper': posrUserWrapper,
    'post-title-container': postTitleContainer,
    'post-title-line': postTitleLine,
    'post-title': postTitle,
    'post-like-image': postLikeImage,
    'post-like-image-favorited': postLikeImageFavorited,
    'post-like-count': postLikeCount,
    'post-tags': postTags,
    'post-user-info': postUserInfo,
    'post-user-name': postUserName,
    'post-date': postDate,
    'post-user-image': postUserImage,
    'tags-wrapper': tagsWrapper,
  } = styles;

  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const tags = tagList.map((item) => {
    return (
      <div className={postTags} key={Math.floor(Math.random() * 100)}>
        {item}
      </div>
    );
  });

  const handleFavorite = async () => {
    if (token !== null) {
      await dispatch(fetchFavoriteArticle(slug, token));
      await dispatch(fetchArticlesAuth(offset, token));
    }
  };

  const handleUnFavorite = async () => {
    if (token !== null) {
      await dispatch(fetchUnfavoriteArticle(slug, token));
      await dispatch(fetchArticlesAuth(offset, token));
    }
  };

  const formattedDate = format(new Date(date), 'MMMM d, yyyy');

  return (
    <div className={postWrapper}>
      <div className={postHeaderWrapper}>
        <div className={postTitleWrapper}>
          <div className={postTitleContainer}>
            <div className={postTitleLine}>
              <Link to={`/article/${slug}`}>
                <div className={postTitle}>{title}</div>
              </Link>
              <div
                className={favorited ? `${postLikeImageFavorited}` : `${postLikeImage}`}
                onClick={!favorited ? handleFavorite : handleUnFavorite}
              ></div>
              <span className={postLikeCount}>{likes}</span>
            </div>
            <div className={tagsWrapper}>{tags}</div>
          </div>
        </div>
        <div className={posrUserWrapper}>
          <div className={postUserInfo}>
            <div className={postUserName}>{user}</div>
            <div className={postDate}>{formattedDate}</div>
          </div>
          <img src={avatar ? avatar : noAvatar} alt="avatar" className={postUserImage}></img>
        </div>
      </div>
      <div className={postDescription}>{description}</div>
    </div>
  );
};

export default Post;
