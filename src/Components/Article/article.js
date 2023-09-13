import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

import { SpinerLarge } from '../Spiner/spiner';
import Error from '../Error/error';
import Modal from '../Modal/modal';
import { fetchOneArticle, fetchOneArticleAuth } from '../../Redux/Actions/fetch-one-article-action';
import { fetchArticlesAuth } from '../../Redux/Actions/fetch-articles-action';
import { fetchDeleteArticle } from '../../Redux/Actions/fetch-delete-article-action';
import noAvatar from '../../Assets/Noavatar.png';
import Like from '../Like/like';

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
  const isLoading = useSelector((state) => state.oneArticleReducer.isLoading);
  const error = useSelector((state) => state.oneArticleReducer.error);
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
  }, [dispatch, slug, token]);

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
    return <SpinerLarge />;
  }
  if (error !== null) {
    return <Error />;
  }
  if (loaded && article) {
    console.log(article.article);
    const { title, description, body, tagList, author, favoritesCount, createdAt, favorited, slug } = article.article;
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
                <Like favorite={favorited} favoritesCount={favoritesCount} slug={slug} />
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
