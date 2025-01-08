import React, { ChangeEvent, useEffect, useRef } from "react";
import Board from "./Board";
import Status from "./Status";
import "./index.scss";
import { ChessType, GameStatus } from "@/types/enums";
const symbolList = [
  "😈",
  "👻",
  "👽",
  "👾",
  "😀",
  "😄",
  "😁",
  "🤣",
  "😊",
  "🙃",
  "🤑",
  "🥵",
  "🥶",
  "🥳",
  "🤡",
  "🤖",
  "👹",
  "💦",
  "💥",
  "🐒",
  "🦍",
  "🐕",
  "🦊",
  "🐅",
  "🦄",
  "🐎",
  "🦓",
  "🐄",
  "🌸",
  "🌻",
  "🌷",
  "🌹",
  "🍇",
  "🍉",
  "🍍",
  "🍓",
  "🥝",
  "🍒",
  "🍑",
  "🥕",
  "🌶️",
  "🍆",
  "✨️",
  "🌟",
  "💖",
  "🦋",
  "👑",
];
const GameComp: React.FC = () => {
  const gameRef = useRef<HTMLDivElement | null>(null);
  const [chesses, setChesses] = React.useState<ChessType[]>([]);
  const [gameStatus, setGameStatus] = React.useState<GameStatus>(
    GameStatus.gaming
  );
  const [redChessSymbol, setRedChessSymbol] = React.useState("👻");
  const [blackChessSymbol, setBlackChessSymbol] = React.useState("😈");
  const [blackChessColor, setBlackChessColor] = React.useState("#000000");
  const [redChessColor, setRedChessColor] = React.useState("#ff2200");
  const [nextChess, setNextChess] = React.useState<ChessType>(ChessType.black);
  useEffect(() => {
    gameInit();
    updateCursor();
  }, []);
  useEffect(() => {
    updateCursor();
  }, [nextChess, blackChessSymbol, redChessSymbol]);
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
  const updateCursor = () => {
    const nextSymbol =
      nextChess === ChessType.red ? redChessSymbol : blackChessSymbol;
    const cursorUrl = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><text x="0" y="20" font-size="20">${encodeURIComponent(
      nextSymbol
    )}</text></svg>') 16 16, auto`;
    gameRef.current!.style.cursor = cursorUrl;
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
  const handleChessColorChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "B" | "R"
  ) => {
    const color = e.target.value;
    if (type === "B") {
      setBlackChessColor(color);
      gameRef.current!.style.setProperty("--black-color", color);
    } else {
      setRedChessColor(color);
      gameRef.current!.style.setProperty("--red-color", color);
    }
  };
  const handleChessSymbolChange = (
    e: ChangeEvent<HTMLSelectElement>,
    type: "B" | "R"
  ) => {
    const symbol = e.target.value;
    if (type === "B") {
      setBlackChessSymbol(symbol);
    } else {
      setRedChessSymbol(symbol);
    }
  };
  return (
    <div className="game-card" ref={gameRef}>
      <h1>三连棋游戏</h1>
      <div className="flex justify-between w-full">
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
            <select
              value={blackChessSymbol}
              onChange={(e) => handleChessSymbolChange(e, "B")}
            >
              {symbolList.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
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
            <select
              value={redChessSymbol}
              onChange={(e) => setRedChessSymbol(e.target.value)}
            >
              {symbolList.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Status
        status={gameStatus}
        next={nextChess}
        redChessSymbol={redChessSymbol}
        blackChessSymbol={blackChessSymbol}
      />
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
