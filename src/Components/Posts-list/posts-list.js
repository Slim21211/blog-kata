import React from 'react';

import Post from './Post/post';
import styles from './post-list.module.scss';

const PostsList = () => {
  const { 'posts-list-wrapper': postsListWrapper } = styles;
  return (
    <div className={postsListWrapper}>
      <Post />
      <Post />
    </div>
  );
};

export default PostsList;
