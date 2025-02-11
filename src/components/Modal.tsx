import { useEffect } from "react";
import { css } from "styled-system/css";

interface Props {
  children: React.ReactNode;
  isImageDecoded: boolean;
  handleModalClose: () => void;
}

export const Modal: React.FC<Props> = ({
  children,
  isImageDecoded,
  handleModalClose,
}) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  });

  return (
    <div
      className={css({
        display: isImageDecoded ? "block" : "none",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        overflowY: "auto",
        zIndex: "modal",
        animation: "fadein 0.15s",
      })}
    >
      <div
        className={css({
          position: "fixed",
          width: "100%",
          height: "100vh",
          backgroundColor: "#000",
          opacity: "0.5",
        })}
        onClick={handleModalClose}
      ></div>
      {children}
    </div>
  );
};
