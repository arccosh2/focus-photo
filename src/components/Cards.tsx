import { useState } from "react";
import { useAnimate } from "framer-motion";
import styles from "src/styles/card.module.css";
import type { Visual } from "src/library/microcms";
import { Modal } from "./Modal";

import openInFullIcon from "src/assets/common/ic_open-in-full.svg";

interface Props {
  visuals: Visual[];
}

export const Cards: React.FC<Props> = ({ visuals }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [underBar, animate] = useAnimate();

  const transformUnderBar = (index: number) => {
    if (!underBar.current || index === activeIndex) return;

    // TODO: 解像度に応じて移動量を調整する
    const moveX = index * 170;

    const moveAnimation = (moveX: number) => {
      animate(
        underBar.current,
        { x: moveX },
        { ease: "backOut", duration: 0.4 },
      );
    };

    moveAnimation(moveX);
  };

  const handleThumbnailClick = (index: number) => {
    transformUnderBar(index);
    setActiveIndex(index);
  };

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const activeVisual = visuals[activeIndex];

  return (
    <>
      <div className={styles.wrapper}>
        <img
          src={activeVisual.photo.url + "?fit=crop&w=960&h=540"}
          className={styles.main_image}
        />
        {!isModalOpen && (
          <button
            className={styles.open_modal_button}
            onClick={handleModalOpen}
          >
            <img src={openInFullIcon.src} className={styles.open_modal_icon} />
          </button>
        )}

        <div className={styles.thumbnails}>
          {visuals.map((visual, index) => (
            <button onClick={() => handleThumbnailClick(index)} key={visual.id}>
              <div
                className={
                  activeIndex === index
                    ? styles.thumbnail
                    : styles.in_active_thumbnail
                }
              >
                <img
                  src={visual.photo.url + "?fit=crop&w=160&h=90"}
                  width="100%"
                  height="100%"
                />
              </div>
            </button>
          ))}
          <span className={styles.under_bar} ref={underBar} />
        </div>
      </div>

      <Modal isOpen={isModalOpen} handleModalClose={handleModalClose}>
        <h2 className={styles.title}>{activeVisual.title}</h2>
        <p className={styles.caption}>{activeVisual.caption}</p>
        <small>taken in {activeVisual.year}</small>
        {activeVisual.tags.map((tag, index) => (
          <small key={tag + `_${index}`} className={styles.tag}>
            #{tag}
          </small>
        ))}
      </Modal>
    </>
  );
};
