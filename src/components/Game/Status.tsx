import React, { ReactElement } from "react";
import { ChessType, GameStatus } from "@/types/enums";
import "./index.scss";
interface IProps {
  status: GameStatus;
  next: ChessType;
}

const GameStatusComp: React.FC<IProps> = (props) => {
  let content: ReactElement;
  if (props.status === GameStatus.gaming) {
    if (props.next === ChessType.red) {
      content = <div className="red">红方落子</div>;
    } else {
      content = <div className="black">黑方落子</div>;
    }
  } else {
    if (props.status === GameStatus.redWin) {
      content = <div className="win red">红方胜利</div>;
    } else if (props.status === GameStatus.blackWin) {
      content = <div className="win black">黑方胜利</div>;
    } else {
      content = <div className="win equal">平局</div>;
    }
  }
  return <div className="status">{content}</div>;
};
export default GameStatusComp;
