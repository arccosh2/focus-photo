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
      {children}
    </div>
  );
};
