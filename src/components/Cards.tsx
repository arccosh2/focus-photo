import { useRef, useState } from "react";
import type { Visual } from "../library/microcms";
import { useAnimate } from "framer-motion";
import styles from "../styles/card.module.css";

interface Props {
  visuals: Visual[];
}

export const Cards: React.FC<Props> = ({ visuals }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
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

  const handleClick = (index: number) => {
    transformUnderBar(index);
    setActiveIndex(index);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.thumbnails}>
        {visuals.map((visual, index) => (
          <button onClick={() => handleClick(index)}>
            <div
              className={
                activeIndex === index
                  ? styles.thumbnail
                  : styles.inActiveThumbnail
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
        <span className={styles.underBar} ref={underBar} />
      </div>
      <img
        src={visuals[activeIndex].photo.url + "?fit=crop&w=960&h=540"}
        className={styles.mainImage}
      />
    </div>
  );
};
