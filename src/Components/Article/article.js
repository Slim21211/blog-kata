import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

import Modal from '../Modal/modal';
import { fetchOneArticle, fetchOneArticleAuth } from '../../Redux/Actions/fetch-one-article-action';
import { fetchArticlesAuth } from '../../Redux/Actions/fetch-articles-action';
import { fetchDeleteArticle } from '../../Redux/Actions/fetch-delete-article-action';
import { fetchFavoriteArticle } from '../../Redux/Actions/fetch-favorite-article-action';
import { fetchUnfavoriteArticle } from '../../Redux/Actions/fetch-unfavorite-article-action';
import noAvatar from '../../Assets/Noavatar.png';

import styles from './article.module.scss';

const Article = () => {
  const {
    'article-wrapper': articleWrapper,
    'article-header-wrapper': articleHeaderWrapper,
    'article-description-wrapper': articleDescriptionWrapper,
    'article-description': articleDescription,
    'article-title-wrapper': articleTitleWrapper,
    'article-user-wrapper': posrUserWrapper,
    'article-title-container': articleTitleContainer,
    'article-title-line': articleTitleLine,
    'article-title': articleTitle,
    'article-like-image': articleLikeImage,
    'article-like-image-favorited': articleLikeImageFavorited,
    'article-like-count': articleLikeCount,
    'article-tags': articleTags,
    'article-user-info': articleUserInfo,
    'article-user-name': articleUserName,
    'article-date': articleDate,
    'article-user-image': articleUserImage,
    'tags-wrapper': tagsWrapper,
    'delete-btn': deleteBtn,
    'edit-btn': editBtn,
    'edit-btn-wrapper': editBtnWrapper,
  } = styles;
  const { slug } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();
  const article = useSelector((state) => state.oneArticleReducer.article);
  const isFavorited = useSelector((state) => state.oneArticleReducer.article.article.favorited);
  const isLoading = useSelector((state) => state.oneArticleReducer.isLoading);
  const loaded = useSelector((state) => state.oneArticleReducer.loaded);
  const token = localStorage.getItem('token');
  const authorUsername = useSelector((state) => state.oneArticleReducer.authorUsername);
  const userName = useSelector((state) => state.getUserReducer.userName);
  const isCurrentUserArticle = authorUsername === userName;
  const [shouldDelete, setShouldDelete] = useState(false);

  useEffect(() => {
    if (token === null) {
      dispatch(fetchOneArticle(slug));
    } else {
      dispatch(fetchOneArticleAuth(slug, token));
    }
  }, [dispatch, slug]);

  const handleFavorite = async () => {
    await dispatch(fetchFavoriteArticle(slug, token));
    await dispatch(fetchOneArticleAuth(slug, token));
  };

  const handleUnFavorite = async () => {
    await dispatch(fetchUnfavoriteArticle(slug, token));
    await dispatch(fetchOneArticleAuth(slug, token));
  };

  const approveDelete = () => {
    dispatch(fetchDeleteArticle(slug, token));
    setShouldDelete(false);
    dispatch(fetchArticlesAuth(0));
    history.push('/page/1');
  };

  const cancelModal = () => {
    setShouldDelete(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (loaded && article) {
    const { title, description, body, tagList, author, favoritesCount, createdAt } = article.article;
    const tag = tagList.map((item) => {
      return (
        <div className={articleTags} key={Math.floor(Math.random() * 100)}>
          {item}
        </div>
      );
    });
    const formattedDate = format(new Date(createdAt), 'MMMM d, yyyy');
    return (
      <div className={articleWrapper}>
        <div className={articleHeaderWrapper}>
          <div className={articleTitleWrapper}>
            <div className={articleTitleContainer}>
              <div className={articleTitleLine}>
                <div className={articleTitle}>{title}</div>
                <div
                  className={!isFavorited ? articleLikeImage : articleLikeImageFavorited}
                  onClick={isFavorited ? handleUnFavorite : handleFavorite}
                ></div>
                <span className={articleLikeCount}>{favoritesCount}</span>
              </div>
              <div className={tagsWrapper}>{tag}</div>
            </div>
          </div>
          <div className={posrUserWrapper}>
            <div className={articleUserInfo}>
              <div className={articleUserName}>{author.username}</div>
              <div className={articleDate}>{formattedDate}</div>
            </div>
            <img src={author.image ? author.image : noAvatar} alt="avatar" className={articleUserImage}></img>
          </div>
        </div>
        <div className={articleDescriptionWrapper}>
          <div className={articleDescription}>{description}</div>
          {isCurrentUserArticle && (
            <>
              <button className={deleteBtn} onClick={() => setShouldDelete(true)}>
                Delete
              </button>
              {shouldDelete && <Modal onApprove={approveDelete} onCancel={cancelModal} />}
              <div className={editBtnWrapper}>
                <Link style={{ height: 31.098 }} to={`/articles/${slug}/edit`}>
                  <button className={editBtn}>Edit</button>
                </Link>
              </div>
            </>
          )}
        </div>
        <div className={articleDescription}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
    );
  }
};

export default Article;
