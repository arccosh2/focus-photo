import { useEffect, useState } from "react";
import { useAnimate } from "framer-motion";
import type { Visual } from "src/library/microcms";
import { Modal } from "./Modal";

import closeIcon from "src/assets/common/ic_close.svg";
import openInFullIcon from "src/assets/common/ic_open-in-full.svg";
import { css } from "styled-system/css";
import { ModalButton } from "./ModalButton";
import { ModalContent } from "./ModalContent";
import { SlideThumbnail } from "./SlideThumbnail";

interface Props {
  visuals: Visual[];
}

const MOVE_X = 170;
const MOVE_X_LARGE = 240;
const LARGE_WINDOW_BREAKPOINT = 1800;

export const Slide: React.FC<Props> = ({ visuals }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowInnerWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [underBar, animate] = useAnimate();

  const transformUnderBar = (index: number) => {
    if (!underBar.current || index === activeIndex) return;

    const baseMoveX =
      windowInnerWidth >= LARGE_WINDOW_BREAKPOINT ? MOVE_X_LARGE : MOVE_X;
    const moveX = index * baseMoveX;

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
        <picture>
          <source
            media="(min-width: 1800px)"
            srcSet={activeVisual.photo.url + "?fit=crop&w=1280&h=720"}
          />
          <img
            src={activeVisual.photo.url + "?fit=crop&w=928&h=522"}
            className={css({
              width: { base: "928px", "3xl": "1280px" },
              height: { base: "522px", "3xl": "720px" },
              borderRadius: "8px",
            })}
          />
        </picture>
        {!isModalOpen && (
          <ModalButton
            className={css({
              top: { base: "16px", "3xl": "20px" },
              right: { base: "16px", "3xl": "20px" },
              width: { "3xl": "40px" },
              height: { "3xl": "40px" },
            })}
            position="absolute"
            backgroundColor="#000"
            opacity="0.8"
            onClick={handleModalOpen}
          >
            <img
              src={openInFullIcon.src}
              className={css({
                width: { base: "18px", "3xl": "24px" },
                height: { base: "18px", "3xl": "24px" },
              })}
            />
          </ModalButton>
        )}

        <div
          className={css({
            position: "relative",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: { base: "10px", "3xl": "16px" },
            display: "flex",
            width: { base: "928px", "3xl": "1280px" },
            height: { base: "102px", "3xl": "137px" },
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
              <SlideThumbnail
                className={
                  activeIndex === index
                    ? css({
                        position: "relative",
                        width: { "3xl": "224px" },
                        height: { "3xl": "126px" },
                      })
                    : css({
                        width: { "3xl": "224px" },
                        height: { "3xl": "126px" },
                        opacity: 0.4,
                      })
                }
              >
                <picture>
                  <source
                    media="(min-width: 1800px)"
                    srcSet={visual.photo.url + "?fit=crop&w=224&h=126"}
                  />
                  <img
                    loading="lazy"
                    src={visual.photo.url + "?fit=crop&w=160&h=90"}
                    className={css({
                      width: "100%",
                      height: "100%",
                    })}
                  />
                </picture>
              </SlideThumbnail>
            </button>
          ))}
          <span
            className={css({
              position: "absolute",
              width: { base: "160px", "3xl": "224px" },
              height: "5px",
              top: { base: "96px", "3xl": "131px" },
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
            className={css({
              width: { base: "320px", "3xl": "400px" },
              margin: { base: "116px 0 0 56%", "3xl": "140px 0 0 60%" },
              minHeight: { base: "160px", "3xl": "176px" },
            })}
            position="relative"
            margin="116px 0 0 56%"
          >
            <ModalButton
              className={css({
                width: { "3xl": "40px" },
                height: { "3xl": "40px" },
              })}
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

            <h2
              className={css({
                fontSize: { base: "md", "3xl": "lm" },
                fontWeight: "600",
              })}
            >
              {activeVisual.title}
            </h2>
            <p
              className={css({
                mt: "4px",
                fontSize: { base: "sm", "3xl": "md" },
              })}
            >
              {activeVisual.caption}
            </p>
            <small className={css({ fontSize: { base: "xs", "3xl": "sm" } })}>
              taken in {activeVisual.year}
            </small>
            {activeVisual.tags.map((tag, index) => (
              <small
                key={tag + `_${index}`}
                className={css({
                  display: "block",
                  fontSize: { base: "xs", "3xl": "sm" },
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
