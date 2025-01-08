import React from "react";
import "./index.scss";
interface IProps {
  text: string;
  onClick: () => void;
  className?: string;
}
const LightBtn: React.FC<IProps> = ({ text, onClick, className }) => {
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const handleBtnClick = () => {
    onClick();
  };
  const mouseEnter = () => {
    if (!btnRef.current) return;
    btnRef.current.classList.add("animate");
  };
  const mouseLeave = () => {
    if (!btnRef.current) return;
    btnRef.current.classList.remove("animate");
  };
  return (
    <button
      onClick={handleBtnClick}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      ref={btnRef}
      className="bubbly-button animate"
    >
      {text}
    </button>
  );
};
export default LightBtn;
