import React, { useRef, useState } from "react";
import type { Visual } from "src/library/microcms";
import { css } from "styled-system/css";
import { Modal } from "./Modal";

import closeIcon from "src/assets/common/ic_close.svg";
import { ModalButton } from "./ModalButton";
import { ModalContent } from "./ModalContent";

interface Props {
  visuals: Visual[];
}

export const Cards: React.FC<Props> = ({ visuals }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDecoded, setIsDecoded] = useState<boolean>(false);

  const modalImageRef = useRef<HTMLImageElement>(null);

  const handleLoadImage = async (img: HTMLImageElement | null) => {
    if (img == null) return;

    try {
      await img.decode();
      setIsDecoded(true);
    } catch (error) {
      console.error(error);
      setIsDecoded(true);
    }
  };

  const handleModalOpen = (index: number) => {
    setIsModalOpen(true);
    setActiveIndex(index);
  };

  const handleModalClose = () => {
    setIsDecoded(false);
    setIsModalOpen(false);
  };

  const activeVisual = visuals[activeIndex];

  return (
    <>
      <div
        className={css({
          display: "grid",
          justifyContent: "center",
          gridTemplateColumns: {
            base: "repeat(3, 110px)",
            xs: "repeat(3, 120px)",
            sm: "repeat(4, 120px)",
            md: "repeat(4, 136px)",
            lg: "repeat(5, 168px)",
          },
          gap: { base: "8px", lg: "16px" },
          mt: "40px",
          mb: "56px",
        })}
      >
        {visuals.map((visual, index) => (
          <button
            key={visual.id}
            className={css({
              height: { base: "146px", xs: "154px", md: "160px", lg: "204px" },
              color: "text",
              backgroundColor: "card",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: {
                base: "6px 6px 7px -9px #777575",
                _dark: "6px 6px 7px -9px #000",
              },
            })}
            onClick={() => handleModalOpen(index)}
          >
            <div
              className={css({
                display: "flex",
                flexDirection: "column",
                height: "100%",
              })}
            >
              <img
                loading="lazy"
                src={visual.photo.url + "?fit=clip&w=240"}
                alt="photo"
                className={css({
                  width: {
                    base: "110px",
                    xs: "120px",
                    md: "136px",
                    lg: "168px",
                  },
                  height: {
                    base: "73px",
                    xs: "80px",
                    md: "91px",
                    lg: "112px",
                  },
                })}
              />
              <div className={css({ textAlign: "left", padding: "8px" })}>
                <h1
                  className={css({
                    fontSize: { base: "xs", lg: "16px" },
                    fontFamily: "Verdana",
                  })}
                >
                  {visual.title}
                </h1>
                <p
                  className={css({
                    fontSize: { base: "xxs", lg: "xs" },
                    mt: "2px",
                  })}
                >
                  taken in {visual.year}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      {isModalOpen && (
        <Modal isImageDecoded={isDecoded} handleModalClose={handleModalClose}>
          <div
            className={css({
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100svh",
            })}
          >
            <ModalContent position="relative" width="320px" minHeight="400px">
              <ModalButton
                variant="sm"
                position="absolute"
                top="14px"
                right="14px"
                width="24px"
                height="24px"
                backgroundColor="#c5c5c5"
                onClick={handleModalClose}
              >
                <img
                  src={closeIcon.src}
                  alt="close modal"
                  className={css({
                    width: "12px",
                    height: "12px",
                  })}
                />
              </ModalButton>
              <img
                ref={modalImageRef}
                src={activeVisual.photo.url + "?fit=clip&w=480"}
                alt="modal image"
                className={css({
                  width: "320px",
                  borderRadius: "12px",
                })}
                onLoad={() => handleLoadImage(modalImageRef.current)}
              />
              <div
                className={css({
                  padding: "12px",
                })}
              >
                <h1
                  className={css({
                    fontSize: { base: "sm", md: "lg" },
                    fontWeight: "600",
                    fontFamily: "Verdana",
                    borderBottom: "1px solid #535252",
                  })}
                >
                  {activeVisual.title}
                </h1>
                <p className={css({ mt: "12px", fontSize: "xs" })}>
                  {activeVisual.caption}
                </p>
                <small className={css({ mt: "24px", fontSize: "xxs" })}>
                  taken in {activeVisual.year}
                </small>
                {activeVisual.tags.map((tag, index) => (
                  <small
                    key={tag + `_${index}`}
                    className={css({
                      display: "block",
                      fontSize: "xxs",
                      color: "#7b7878",
                    })}
                  >
                    #{tag}
                  </small>
                ))}
              </div>
            </ModalContent>
          </div>
        </Modal>
      )}
    </>
  );
};
