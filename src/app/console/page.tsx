import React from "react";
import Navbar from "../components/Navbar";
import GameComponent from "../components/GameComponent";

const GameConsole = () => {
  return (
    <div className="blurryBackground bg-no-repeat bg-cover max-w-8xl h-screen flex flex-col justify-start items-center">
      <Navbar />
      <GameComponent/>
    </div>
  );
};

export default GameConsole;
