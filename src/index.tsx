import React from "react";
import { createRoot } from "react-dom/client";
import BGSnow from "./components/Snow";
import BGParticle from "./components/Particle";
import BGTree from "./components/Tree";
import Game from "./components/Game/index";
import LightBtn from "./components/LightBtn";
import "./index.scss";
import "@/assets/style/tailwind.scss";
import "@/assets/style/btn.scss";

const App: React.FC = () => {
  const [bgIndex, setBgIndex] = React.useState(0);
  const handleBGChange = () => {
    setBgIndex((pre) => (pre + 1) % 2);
  };

  return (
    <>
      {bgIndex === 0 ? <BGParticle /> : ""}
      {bgIndex === 1 ? <BGSnow /> : ""}
      {/* {bgIndex === 2 ? <BGTree /> : ""} */}
      {/* <div className="[w-500px] h-[500px] bg-[red]">dsvsdv</div> */}
      {[0].includes(bgIndex) ? (
        <div className="button-wrapper">
          <span className="dot dot-1"></span>
          <span className="dot dot-2"></span>
          <span className="dot dot-3"></span>
          <span className="dot dot-4"></span>
          <span className="dot dot-5"></span>
          <span className="dot dot-6"></span>
          <span className="dot dot-7"></span>
          <span
            className="button bg-yellow-500 px-10 py-4 rounded-full"
            onClick={handleBGChange}
          >
            <span>切换背景</span>
          </span>
        </div>
      ) : (
        <LightBtn
          text="切换背景"
          onClick={handleBGChange}
          className="check-btn-pos"
        />
      )}
      <Game />
    </>
  );
};
const root = createRoot(document.getElementById("root")!);
root.render(<App />);
