import Chess from "./Chess";
import React from "react";
import { ChessType } from "@/types/enums";
import "./index.scss";
interface IProps {
  chesses: ChessType[];
  isGameOver?: boolean;
  redChess?: string;
  blackChess?: string;
  onClick?: (index: number) => void;
}

const BoardComp: React.FC<IProps> = function (props) {
  const isGameOver = props.isGameOver!;

  const list = props.chesses.map((type, i) => (
    <Chess
      key={i}
      type={type}
      redChess={props.redChess}
      blackChess={props.blackChess}
      onClick={() => {
        if (props.onClick && !isGameOver) {
          props.onClick(i);
        }
      }}
    />
  ));
  return <div className="board">{list}</div>;
};
export default BoardComp;
