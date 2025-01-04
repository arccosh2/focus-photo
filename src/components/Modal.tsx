import { useState } from "react";
import openInFullIcon from "src/assets/common/ic_open-in-full.svg";
import closeIcon from "src/assets/common/ic_close.svg";
import type { Visual } from "src/library/microcms";

interface Props {
  visual: Visual;
}

export const Modal: React.FC<Props> = ({ visual }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return isOpen ? (
    <div className="back_drop">
      <div className="contents_area">
        <button className="modal_button" onClick={handleClick}>
          <img src={closeIcon.src} className="close_icon" />
        </button>

        <h2>{visual.title}</h2>
        <p>{visual.caption}</p>
        <small>taken in {visual.year}</small>
        {visual.tags.map((tag) => (
          <small>#{tag}</small>
        ))}
      </div>
    </div>
  ) : (
    <button className="modal_button" onClick={handleClick}>
      <img src={openInFullIcon.src} className="open_in_full_icon" />
    </button>
  );
};
