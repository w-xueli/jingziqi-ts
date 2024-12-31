import React from "react";
import { ChessType, GameStatus } from "@/types/enums";
import "./index.scss";
interface IProps {
    status: GameStatus;
    next: ChessType;
}
declare const GameStatusComp: React.FC<IProps>;
export default GameStatusComp;
