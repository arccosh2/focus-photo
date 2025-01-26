import { useState } from "react";
import closeIcon from "src/assets/common/ic_close.svg";
import styles from "src/styles/modal.module.css";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  handleModalClose: () => void;
}

export const Modal: React.FC<Props> = ({
  children,
  isOpen,
  handleModalClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.back_drop} onClick={handleModalClose}></div>
      <div className={styles.contents_area}>
        <button className={styles.close_button} onClick={handleModalClose}>
          <img src={closeIcon.src} className={styles.close_icon} />
        </button>
        {children}
      </div>
    </div>
  );
};
