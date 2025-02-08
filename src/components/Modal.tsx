import { css } from "styled-system/css";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  isImageDecoded: boolean;
  handleModalClose: () => void;
}

export const Modal: React.FC<Props> = ({
  children,
  isOpen,
  isImageDecoded,
  handleModalClose,
}) => {
  if (!isOpen) return null;

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
          position: "absolute",
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
