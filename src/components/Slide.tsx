import { useState } from "react";
import { useAnimate } from "framer-motion";
import type { Visual } from "src/library/microcms";
import { Modal } from "./Modal";

import closeIcon from "src/assets/common/ic_close.svg";
import openInFullIcon from "src/assets/common/ic_open-in-full.svg";
import { css } from "styled-system/css";

interface Props {
  visuals: Visual[];
}

export const Slide: React.FC<Props> = ({ visuals }) => {
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
      <div
        className={css({
          display: "flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          animation: "fadein 0.3s",
        })}
      >
        <img
          src={activeVisual.photo.url + "?fit=crop&w=928&h=522"}
          className={css({
            width: "928px",
            height: "522px",
            borderRadius: "8px",
          })}
        />
        {!isModalOpen && (
          <button
            className={css({
              position: "absolute",
              top: "16px",
              right: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "40px",
              height: "40px",
              backgroundColor: "#000",
              opacity: 0.8,
              borderRadius: "50%",
            })}
            onClick={handleModalOpen}
          >
            <img
              src={openInFullIcon.src}
              className={css({
                width: "24px",
                height: "24px",
              })}
            />
          </button>
        )}

        <div
          className={css({
            position: "relative",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "10px",
            display: "flex",
            width: "928px",
            height: "102px",
            mt: "16px",
            overflow: "scroll",
            overflowY: "hidden",
            scrollbarWidth: "none",
            _scrollbar: {
              display: "none",
            },
          })}
        >
          {visuals.map((visual, index) => (
            <button onClick={() => handleThumbnailClick(index)} key={visual.id}>
              <div
                className={
                  activeIndex === index
                    ? css({
                        position: "relative",
                        width: "160px",
                        height: "90px",
                        borderRadius: "8px",
                        overflow: "hidden",
                      })
                    : css({
                        width: "160px",
                        height: "90px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        opacity: 0.4,
                      })
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
          <span
            className={css({
              position: "absolute",
              width: "160px",
              height: "5px",
              top: "96px",
              backgroundColor: "underBar",
              borderRadius: "4px",
            })}
            ref={underBar}
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen} handleModalClose={handleModalClose}>
        <div
          className={css({
            position: "absolute",
            top: "150px",
            right: "340px",
            width: "320px",
            height: "160px",
            color: "#222222",
            backgroundColor: "#e6e6e6",
            borderRadius: "16px",
            padding: "1.2%",
            overflow: "scroll",
            zIndex: "contents",
          })}
        >
          <button
            className={css({
              position: "absolute",
              top: "10px",
              right: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              backgroundColor: "#c5c5c5",
              borderRadius: "50%",
            })}
            onClick={handleModalClose}
          >
            <img
              src={closeIcon.src}
              className={css({
                width: "18px",
                height: "18px",
              })}
            />
          </button>

          <h2 className={css({ fontSize: "md", fontWeight: "600" })}>
            {activeVisual.title}
          </h2>
          <p className={css({ mt: "4px", fontSize: "sm" })}>
            {activeVisual.caption}
          </p>
          <small>taken in {activeVisual.year}</small>
          {activeVisual.tags.map((tag, index) => (
            <small
              key={tag + `_${index}`}
              className={css({
                display: "block",
                fontSize: "xs",
                color: "#7b7878",
              })}
            >
              #{tag}
            </small>
          ))}
        </div>
      </Modal>
    </>
  );
};
