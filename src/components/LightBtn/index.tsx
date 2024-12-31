import React from "react";
import "./index.scss";
interface IProps {
  text: string;
  onClick: () => void;
  className?: string;
}
const LightBtn: React.FC<IProps> = ({ text, onClick, className }) => {
  return (
    <div className={`shine-btn-wrapper ${className}`}>
      <button onClick={onClick}>
        <span className="text">{text}</span>
        <span className="shimmer"></span>
      </button>
    </div>
  );
};
export default LightBtn;
