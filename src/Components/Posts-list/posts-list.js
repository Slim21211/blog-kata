import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import { useParams, useHistory, Link } from 'react-router-dom';

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

  const { pageNumber } = useParams();
  const history = useHistory();

  const changePage = (page) => {
    setCurrentPage(page);

    history.push(`/page/${page}`);
  };

  useEffect(() => {
    dispatch(fetchArticles((pageNumber - 1) * 20));
  }, [dispatch, pageNumber]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error !== null) {
    return <div>ERROR</div>;
  }
  return (
    <div className={postsListWrapper}>
      {articles.map((item) => {
        const { title, tagList, author, updatedAt, body, favoritesCount, slug } = item;
        return (
          <Link to={`/article/${slug}`} key={item.slug}>
            <Post
              title={title}
              tagList={tagList}
              user={author.username}
              date={updatedAt}
              description={body}
              avatar={author.image}
              likes={favoritesCount}
            />
          </Link>
        );
      })}
      <Pagination
        defaultCurrent={currentPage}
        current={parseInt(pageNumber, 10)}
        total={Math.ceil((articlesCount / 20) * 10)}
        showSizeChanger={false}
        style={{ marginTop: '20px', textAlign: 'center' }}
        onChange={changePage}
      />
    </div>
  );
};

export default PostsList;
