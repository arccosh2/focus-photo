import { styled } from "styled-system/jsx";

export const ModalButton = styled("button", {
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "32px",
    height: "32px",
    rounded: "50%",
  },
  variants: {
    variant: {
      sm: {
        width: "24px",
        height: "24px",
      },
    },
  },
});
