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
declare const BoardComp: React.FC<IProps>;
export default BoardComp;
