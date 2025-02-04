import { useState } from "react";
import type { Visual } from "src/library/microcms";
import { css } from "styled-system/css";
import { Modal } from "./Modal";

import closeIcon from "src/assets/common/ic_close.svg";

interface Props {
  visuals: Visual[];
}

export const Cards: React.FC<Props> = ({ visuals }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClick = (index: number) => {
    if (isModalOpen) {
      setIsModalOpen(false);

      return;
    }

    setIsModalOpen(true);
    setActiveIndex(index);
  };

  const activeVisual = visuals[activeIndex];

  return (
    <>
      <div
        className={css({
          display: "grid",
          justifyContent: "center",
          gridTemplateColumns: "repeat(3, 120px)",
          gap: "8px",
          mt: "40px",
        })}
      >
        {visuals.map((visual, index) => (
          <div
            className={css({
              height: "154px",
              color: "text",
              backgroundColor: "card",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: {
                base: "6px 6px 7px -9px #777575",
                _dark: "6px 6px 7px -9px #000",
              },
            })}
          >
            <div className={css({ display: "flex", flexDirection: "column" })}>
              <button onClick={() => handleClick(index)}>
                <img
                  src={visual.photo.url + "?fit=clip&w=120?q=75"}
                  alt="photo"
                  width="120px"
                />
              </button>
              <div className={css({ padding: "8px" })}>
                <h1
                  className={css({
                    fontSize: "xs",
                    fontFamily: "Verdana",
                  })}
                >
                  {visual.title}
                </h1>
                <p className={css({ fontSize: "xxs", mt: "2px" })}>
                  taken in {visual.year}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        handleModalClose={() => setIsModalOpen(false)}
      >
        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100svh",
          })}
        >
          <div
            className={css({
              position: "relative",
              width: "320px",
              minHeight: "400px",
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
                top: "14px",
                right: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "24px",
                height: "24px",
                backgroundColor: "#c5c5c5",
                borderRadius: "50%",
              })}
              onClick={() => setIsModalOpen(false)}
            >
              <img
                src={closeIcon.src}
                className={css({
                  width: "12px",
                  height: "12px",
                })}
              />
            </button>
            <img
              src={activeVisual.photo.url + "?fit=clip&w=320?q=75"}
              className={css({
                width: "320px",
                borderRadius: "12px",
              })}
            />
            <div
              className={css({
                padding: "12px",
              })}
            >
              <h1
                className={css({
                  fontSize: "sm",
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
          </div>
        </div>
      </Modal>
    </>
  );
};
