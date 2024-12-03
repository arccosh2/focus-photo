import { useRef, useState } from "react";
import type { Visual } from "../library/microcms";
import styles from "../styles/card.module.css";

interface Props {
  visuals: Visual[];
}

export const Cards: React.FC<Props> = ({ visuals }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.thumbnails} data-scroll-area>
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
      </div>
      <img
        src={visuals[activeIndex].photo.url + "?fit=crop&w=960&h=540"}
        className={styles.mainImage}
      />
    </div>
  );
};
