import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { createArticle } from '../../Redux/Actions/fetch-create-article-action';
import { fetchArticlesAuth } from '../../Redux/Actions/fetch-articles-action';
import { editArticle } from '../../Redux/Actions/fetch-edit-article-action';
import { SpinerSmall } from '../Spiner/spiner';
import { HOME, SIGN_IN } from '../../routePath';

import styles from './create-article.module.scss';

const CreateArticle = ({ isEditing, articleData, slug }) => {
  const {
    wrapper,
    header,
    form,
    label,
    input,
    'input-descr': inputDescr,
    textarea,
    'tags-wrapper': tagsWrapper,
    'tag-wrapper': tagWrapper,
    'tags-title': tagsTitle,
    'input-tag': inputTag,
    'delete-btn': deleteBtn,
    'add-btn': addBtn,
    button,
  } = styles;

  const isLoading = useSelector((state) => state.createArticleReducer.isLoading);
  const error = useSelector((state) => state.createArticleReducer.error);
  const token = localStorage.getItem('token');
  const history = useHistory();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    body: '',
    tags: [],
  });
  const [tagValue, setTagValue] = useState('');

  useEffect(() => {
    if (token === null) {
      history.push(SIGN_IN);
    }
    if (isEditing) {
      setFormData({
        title: articleData.title,
        description: articleData.description,
        body: articleData.body,
        tags: articleData.tags,
      });
      setValue('title', articleData.title);
      setValue('description', articleData.description);
      setValue('body', articleData.body);
    }
  }, [isEditing, articleData, history]);

  const dispatch = useDispatch();

  const addTag = (event) => {
    event.preventDefault();
    setFormData({ tags: [...formData.tags, tagValue] });
    setTagValue('');
  };

  const deleteTag = (event, index) => {
    event.preventDefault();
    const updatedTags = [...formData.tags];
    updatedTags.splice(index, 1);
    setFormData({ ...formData, tags: updatedTags });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    const token = localStorage.getItem('token');
    if (!isEditing) {
      data.tagList = formData.tags;

      dispatch(createArticle(data, token));
      dispatch(fetchArticlesAuth(0));
      history.push(HOME);
    } else {
      dispatch(editArticle(data, slug, token));
      dispatch(fetchArticlesAuth(0));
      history.push(HOME);
    }
  };

  return (
    <div className={wrapper}>
      <h2 className={header}>{isEditing ? 'Edit article' : 'Create new article'} </h2>
      <form className={form} onSubmit={handleSubmit(onSubmit)}>
        <label className={label}>
          <div>Title</div>
          <input
            className={input}
            type="text"
            name="title"
            placeholder="Title"
            {...register('title', {
              required: 'Title is required',
            })}
          />
        </label>
        {errors.title && <div className={inputDescr}>{errors.title.message}</div>}
        <label className={label}>
          <div>Short description</div>
          <input
            className={input}
            type="text"
            name="description"
            placeholder="Short description"
            {...register('description', {
              required: 'Short description is required',
            })}
          />
        </label>
        {errors.description && <div className={inputDescr}>{errors.description.message}</div>}
        <label className={label}>
          <div>Text</div>
          <textarea
            className={textarea}
            rows={10}
            cols={50}
            placeholder="Text"
            name="body"
            {...register('body', {
              required: 'Text is required',
            })}
          />
        </label>
        {errors.body && <div className={inputDescr}>{errors.body.message}</div>}
        <div className={tagsWrapper}>
          <div className={tagsTitle}>Tags</div>
          {formData.tags.map((elem, index) => {
            return (
              <div key={index} className={tagWrapper}>
                <label className={label}>
                  <input
                    className={inputTag}
                    type="text"
                    placeholder="Tag"
                    value={elem}
                    onChange={(event) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        title: event.target.value,
                      }));
                    }}
                  />
                </label>
                <button className={deleteBtn} onClick={(event) => deleteTag(event, index)}>
                  Delete
                </button>
              </div>
            );
          })}
          <div className={tagWrapper}>
            <label className={label}>
              <input
                className={inputTag}
                type="text"
                placeholder="Tag"
                value={tagValue}
                onChange={(event) => {
                  setTagValue(event.target.value);
                }}
              />
            </label>
            <button className={deleteBtn}>Delete</button>

            <button
              className={addBtn}
              onClick={(event) => {
                addTag(event);
              }}
            >
              Add tag
            </button>
          </div>
        </div>
        {isLoading && <SpinerSmall />}
        {error && <div className={inputDescr}>Something has gone wrong. Try again later</div>}
        <button className={button} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;
