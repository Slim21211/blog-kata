import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { createArticle } from '../../Redux/Actions/fetch-create-article-action';

import styles from './create-article.module.scss';

const CreateArticle = () => {
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

  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const addTag = (event) => {
    event.preventDefault();
    setTags([...tags, tagValue]);
    setTagValue('');
  };

  const deleteTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (data) => {
    data.tagList = tags;
    console.log(data);
    const token = localStorage.getItem('token');
    dispatch(createArticle(data, token));
    history.push('/page/1');
  };

  return (
    <div className={wrapper}>
      <h2 className={header}>Create new article</h2>
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
          {tags.map((elem, index) => {
            return (
              <div key={index} className={tagWrapper}>
                <label className={label}>
                  <input
                    className={inputTag}
                    type="text"
                    placeholder="Tag"
                    value={elem}
                    onChange={(event) => {
                      const updatedTags = [...tags];
                      updatedTags[index] = event.target.value;
                      setTags(updatedTags);
                    }}
                  />
                </label>
                <button className={deleteBtn} onClick={() => deleteTag(index)}>
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
        <button className={button} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;
