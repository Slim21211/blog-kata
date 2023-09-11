import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import { fetchOneArticle } from '../../Redux/Actions/fetch-one-article-action';
import CreateArticle from '../Create-article/create-article';

const EditArticle = () => {
  const [articleData, setArticleData] = useState({
    title: '',
    description: '',
    body: '',
    tags: [],
  });

  const article = useSelector((state) => state.oneArticleReducer.article);
  const loaded = useSelector((state) => state.oneArticleReducer.loaded);

  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchOneArticle(slug));

    if (loaded) {
      setArticleData({
        ...articleData,
        title: article.article.title,
        description: article.article.description,
        body: article.article.body,
        tags: article.article.tagList,
      });
    }
  }, [dispatch, loaded]);

  return (
    <div>
      <CreateArticle articleData={articleData} isEditing={true} slug={slug} />
    </div>
  );
};

export default EditArticle;