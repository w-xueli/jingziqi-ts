import React from "react";
import { ChessType } from "@/types/enums";
import "./index.scss";

interface IProps {
  type: ChessType;
  redChess?: string;

  blackChess?: string;
  onClick?: () => void;
}

const Chess: React.FC<IProps> = ({ type, onClick, redChess, blackChess }) => {
  let chess = null;
  if (type === ChessType.red) {
    chess = <div className="red chess-item">{redChess}</div>;
  } else if (type === ChessType.black) {
    chess = <div className="black chess-item">{blackChess}</div>;
  }

  return (
    <div
      className="chess"
      onClick={() => {
        if (type === ChessType.none && onClick) {
          //怎么处理
          onClick();
        }
      }}
    >
      {chess}
    </div>
  );
};
export default Chess;
