import React from "react";
import { ChessType } from "@/types/enums";
import "./index.scss";
interface IProps {
    type: ChessType;
    redChess?: string;
    blackChess?: string;
    onClick?: () => void;
}
declare const Chess: React.FC<IProps>;
export default Chess;
