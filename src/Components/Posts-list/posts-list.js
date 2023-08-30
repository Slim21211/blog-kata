import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'antd';

import { fetchArticles } from '../../Redux/Actions/fetch-articles-action';

import Post from './Post/post';
import styles from './post-list.module.scss';

const PostsList = () => {
  const { 'posts-list-wrapper': postsListWrapper } = styles;
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articleReducer.articles);
  const articlesCount = useSelector((state) => state.articleReducer.articlesCount);
  const isLoading = useSelector((state) => state.articleReducer.isLoading);
  const error = useSelector((state) => state.articleReducer.error);
  const [currentPage, setCurrentPage] = useState(1);

  console.log(articles);
  console.log(articlesCount);

  const changePage = (page) => {
    console.log(page);
    setCurrentPage(page);
    dispatch(fetchArticles((page - 1) * 20));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error !== null) {
    return <div>ERROR</div>;
  }
  return (
    <div className={postsListWrapper}>
      {articles.map((item) => {
        const { title, tagList, author, updatedAt, body } = item;

        return (
          <Post
            key={item.slug}
            title={title}
            tagList={tagList}
            user={author.username}
            date={updatedAt}
            description={body}
            avatar={author.image}
          />
        );
      })}
      <Pagination
        defaultCurrent={currentPage}
        total={(articlesCount / 20) * 10}
        showSizeChanger={false}
        style={{ marginTop: '20px', textAlign: 'center' }}
        onChange={changePage}
      />
    </div>
  );
};

export default PostsList;
