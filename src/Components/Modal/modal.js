import React from 'react';

import styles from './modal.module.scss';

const Modal = ({ onApprove, onCancel }) => {
  const {
    wrapper,
    'title-wrapper': titleWrapper,
    title,
    icon,
    'btn-wrapper': btnWrapper,
    'no-button': noButton,
    'yes-button': yesButton,
  } = styles;

  return (
    <div className={wrapper}>
      <div className={titleWrapper}>
        <div className={icon}></div>
        <div className={title}>Are you sure to delete this article?</div>
      </div>

      <div className={btnWrapper}>
        <button className={noButton} onClick={onCancel}>
          No
        </button>
        <button className={yesButton} onClick={onApprove}>
          Yes
        </button>
      </div>
    </div>
  );
};

export default Modal;
