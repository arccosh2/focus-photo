import closeIcon from "src/assets/common/ic_close.svg";
import { css } from "styled-system/css";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  handleModalClose: () => void;
}

export const Modal: React.FC<Props> = ({
  children,
  isOpen,
  handleModalClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={css({
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        display: "grid",
        overflowY: "auto",
        zIndex: "modal",
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
      <div
        className={css({
          position: "absolute",
          top: "136px",
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
        {children}
      </div>
    </div>
  );
};
