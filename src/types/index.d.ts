interface Window {
  particlesJS: any;
}
interface Text {
  a: string;
}
enum ChessType {
  none = 0,
  red,
  black,
}

enum GameStatus {
  /**
   * 正在游戏中
   */
  gaming,
  /**
   * 红方胜利
   */
  redWin,
  /**
   * 黑方胜利
   */
  blackWin,
  /**
   * 平局
   */
  equal,
}
