import { useState } from "react";
import { useAnimate } from "framer-motion";
import type { Visual } from "src/library/microcms";
import { Modal } from "./Modal";

import closeIcon from "src/assets/common/ic_close.svg";
import openInFullIcon from "src/assets/common/ic_open-in-full.svg";
import { css } from "styled-system/css";
import { ModalButton } from "./ModalButton";
import { ModalContent } from "./ModalContent";

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
          <ModalButton
            position="absolute"
            top="16px"
            right="16px"
            backgroundColor="#000"
            opacity="0.8"
            onClick={handleModalOpen}
          >
            <img
              src={openInFullIcon.src}
              className={css({
                width: "18px",
                height: "18px",
              })}
            />
          </ModalButton>
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
            mt: "12px",
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
                  loading="lazy"
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

      {isModalOpen && (
        <Modal isImageDecoded={true} handleModalClose={handleModalClose}>
          <ModalContent
            position="absolute"
            top="150px"
            right="340px"
            width="320px"
            height="160px"
          >
            <ModalButton
              position="absolute"
              top="10px"
              right="10px"
              backgroundColor="#c5c5c5"
              onClick={handleModalClose}
            >
              <img
                src={closeIcon.src}
                className={css({
                  width: "18px",
                  height: "18px",
                })}
              />
            </ModalButton>

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
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
