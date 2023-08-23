import React from 'react';

import styles from './post.module.scss';

const Post = () => {
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
    'post-like-count': postLikeCount,
    'post-tags': postTags,
    'post-user-info': postUserInfo,
    'post-user-name': postUserName,
    'post-date': postDate,
    'post-user-image': postUserImage,
  } = styles;
  return (
    <div className={postWrapper}>
      <div className={postHeaderWrapper}>
        <div className={postTitleWrapper}>
          <div className={postTitleContainer}>
            <div className={postTitleLine}>
              <div className={postTitle}>Some article title</div>
              <div className={postLikeImage}></div>
              <span className={postLikeCount}>12</span>
            </div>
            <div className={postTags}>Tag1</div>
          </div>
        </div>
        <div className={posrUserWrapper}>
          <div className={postUserInfo}>
            <div className={postUserName}>John Doe</div>
            <div className={postDate}>March 5, 2020 </div>
          </div>
          <img src="#" alt="avatar" className={postUserImage}></img>
        </div>
      </div>
      <div className={postDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.{' '}
      </div>
    </div>
  );
};

export default Post;
