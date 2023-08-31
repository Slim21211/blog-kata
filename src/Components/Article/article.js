import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

import { fetchOneArticle } from '../../Redux/Actions/fetch-one-article-action';
import noAvatar from '../../Assets/Noavatar.png';

import styles from './article.module.scss';

const Article = () => {
  const {
    'article-wrapper': articleWrapper,
    'article-header-wrapper': articleHeaderWrapper,
    'article-description': articleDescription,
    'article-title-wrapper': articleTitleWrapper,
    'article-user-wrapper': posrUserWrapper,
    'article-title-container': articleTitleContainer,
    'article-title-line': articleTitleLine,
    'article-title': articleTitle,
    'article-like-image': articleLikeImage,
    'article-like-count': articleLikeCount,
    'article-tags': articleTags,
    'article-user-info': articleUserInfo,
    'article-user-name': articleUserName,
    'article-date': articleDate,
    'article-user-image': articleUserImage,
    'tags-wrapper': tagsWrapper,
  } = styles;
  const { slug } = useParams();

  const dispatch = useDispatch();
  const article = useSelector((state) => state.oneArticleReducer.article);
  const isLoading = useSelector((state) => state.oneArticleReducer.isLoading);
  const loaded = useSelector((state) => state.oneArticleReducer.loaded);
  console.log(article);

  useEffect(() => {
    dispatch(fetchOneArticle(slug));
  }, [dispatch, slug]);

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
                <div className={articleLikeImage}></div>
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
        <div className={articleDescription}>{description}</div>
        <div className={articleDescription}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
    );
  }
};

export default Article;
