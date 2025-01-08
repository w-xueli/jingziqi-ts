import React, { ReactElement } from "react";
import { ChessType, GameStatus } from "@/types/enums";
import "./index.scss";

interface IProps {
  status: GameStatus;
  next: ChessType;
  redChessSymbol: string;
  blackChessSymbol: string;
}

const GameStatusComp: React.FC<IProps> = ({
  status,
  next,
  redChessSymbol,
  blackChessSymbol,
}) => {
  const getContent = (): ReactElement => {
    if (status === GameStatus.gaming) {
      return (
        <div className={`${next === ChessType.red ? "red" : "black"} flex`}>
          <div className="symbol-bounce">
            {next === ChessType.red ? redChessSymbol : blackChessSymbol}
          </div>
          落子
        </div>
      );
    } else {
      switch (status) {
        case GameStatus.redWin:
          return <div className="win red">{redChessSymbol}胜利</div>;
        case GameStatus.blackWin:
          return <div className="win black">{blackChessSymbol}胜利</div>;
        default:
          return <div className="win equal">平局</div>;
      }
    }
  };

  const content = getContent();

  return <div className="status">{content}</div>;
};

export default React.memo(GameStatusComp);
