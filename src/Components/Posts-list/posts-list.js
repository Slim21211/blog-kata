import React from 'react';
import { useSelector } from 'react-redux';

import Post from './Post/post';
import styles from './post-list.module.scss';

const PostsList = () => {
  const { 'posts-list-wrapper': postsListWrapper } = styles;
  const articles = useSelector((state) => state.articleReducer.articles);
  const articlesCount = useSelector((state) => state.articleReducer.articlesCount);

  console.log(articles);
  console.log(articlesCount);

  return (
    <div className={postsListWrapper}>
      <Post />
      <Post />
    </div>
  );
};

export default PostsList;
