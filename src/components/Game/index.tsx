import React, { ChangeEvent, useEffect, useRef } from "react";
import Board from "./Board";
import Status from "./Status";
import "./index.scss";
import { ChessType, GameStatus } from "@/types/enums";

const GameComp: React.FC = () => {
  const [symbolList, setSymbolList] = React.useState([]);
  const gameRef = useRef<HTMLDivElement | null>(null);
  const [chesses, setChesses] = React.useState<ChessType[]>([]);
  const [gameStatus, setGameStatus] = React.useState<GameStatus>(
    GameStatus.gaming
  );
  const [redChessSymbol, setRedChessSymbol] = React.useState("🚩");
  const [blackChessSymbol, setBlackChessSymbol] = React.useState("😈");
  const [blackChessColor, setBlackChessColor] = React.useState("#000000");
  const [redChessColor, setRedChessColor] = React.useState("#f20");
  const [nextChess, setNextChess] = React.useState<ChessType>(ChessType.black);
  useEffect(() => {
    gameInit();
    getSymbolList();
  }, []);
  const getSymbolList = async () => {
    let list = [];
    fetch("/emojis")
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  /**
   * 初始化数据
   */
  const gameInit = () => {
    const arr: ChessType[] = [];
    for (let i = 0; i < 9; i++) {
      arr.push(ChessType.none);
    }
    setChesses(arr);
    setGameStatus(GameStatus.gaming);
    setNextChess(ChessType.red);
  };

  /**
   * 处理棋子的点击事件
   * 如果该函数运行，说明：
   * 1. 游戏没有结束
   * 2. 点击的位置没有棋子
   * @param index
   */
  const handleChessClick = (index: number) => {
    // this.state.cheeses[index] = this.state.nextChess;
    chesses[index] = nextChess;
    setChesses([...chesses]);
    setGameStatus(getStatus(chesses, index));
    setNextChess(nextChess === ChessType.red ? ChessType.black : ChessType.red);
  };

  const getStatus = (chesses: ChessType[], index: number): GameStatus => {
    //1. 判断是否有一方获得胜利
    const horMin = Math.floor(index / 3) * 3;
    const verMin = index % 3;
    if (
      (chesses[horMin] === chesses[horMin + 1] &&
        chesses[horMin] === chesses[horMin + 2]) ||
      (chesses[verMin] === chesses[verMin + 3] &&
        chesses[verMin] === chesses[verMin + 6]) ||
      (chesses[0] === chesses[4] &&
        chesses[0] === chesses[8] &&
        chesses[0] !== ChessType.none) ||
      (chesses[2] === chesses[4] &&
        chesses[2] === chesses[6] &&
        chesses[2] !== ChessType.none)
    ) {
      if (chesses[index] === ChessType.red) {
        return GameStatus.redWin;
      } else {
        return GameStatus.blackWin;
      }
    }
    //2. 判断是否平局
    if (!chesses.includes(ChessType.none)) {
      return GameStatus.equal;
    }
    //3. 游戏正在进行
    return GameStatus.gaming;
  };
  const chessSymbolChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "R" | "B"
  ) => {
    if (type === "R") setRedChessSymbol(e.target.value);
    else setBlackChessSymbol(e.target.value);
  };
  const handleChessColorChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "B" | "R"
  ) => {
    const color = e.target.value;
    console.log(color);
    if (type === "B") {
      setBlackChessColor(color);
      gameRef.current!.style.setProperty("--black-color", color);
    } else {
      setRedChessColor(color);
      gameRef.current!.style.setProperty("--red-color", color);
    }
  };
  return (
    <div className="game-card" ref={gameRef}>
      <h1>三连棋游戏</h1>
      <div className="flex justify-between">
        <div>
          <div>
            <label>黑方配色</label>
            <input
              value={blackChessColor}
              type="color"
              onChange={(e) => handleChessColorChange(e, "B")}
            />
          </div>
          <div>
            <label>黑方Symbol</label>
            <input
              type="text"
              onChange={(e) => chessSymbolChange(e, "B")}
            ></input>
          </div>
        </div>
        <div>
          <div>
            <label>红方配色</label>
            <input
              value={redChessColor}
              type="color"
              onChange={(e) => handleChessColorChange(e, "R")}
            />
          </div>
          <div>
            <label>红方Symbol</label>
            <input
              type="text"
              onChange={(e) => chessSymbolChange(e, "R")}
            ></input>
          </div>
        </div>
      </div>
      <Status status={gameStatus} next={nextChess} />
      <Board
        chesses={chesses}
        isGameOver={gameStatus !== GameStatus.gaming}
        onClick={handleChessClick}
        redChess={redChessSymbol}
        blackChess={blackChessSymbol}
      />
      <button onClick={gameInit} className="reset">
        重新开始
      </button>
    </div>
  );
};
export default GameComp;
