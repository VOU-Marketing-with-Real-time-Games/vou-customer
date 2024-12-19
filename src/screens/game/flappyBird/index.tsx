import React, { useRef, useState } from "react";
import { GameEngine } from "react-native-game-engine";

import { styles } from "./style";

import { Start } from "./Start";
import { GameOver } from "./GameOver";
import { Physics } from "../../../utils/physics";

import entities from "../../../components/game/entities";

const Game = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const gameEngineRef = useRef(null);

  const handlebackToStart = () => {
    setIsRunning(false);
    setIsGameOver(false);
  };

  const handleOnStartGame = () => {
    setIsRunning(true);
    setIsGameOver(false);
  };

  const handleOnGameOver = () => {
    setIsRunning(false);
    setIsGameOver(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnEvent = (event: any) => {
    switch (event.type) {
      case "game_over":
        handleOnGameOver();
        break;
      default:
        break;
    }
  };

  if (!isRunning && !isGameOver) {
    return <Start handleOnStartGame={handleOnStartGame} />;
  }
  if (!isRunning && isGameOver) {
    return <GameOver handlebackToStart={handlebackToStart} />;
  }

  return (
    <GameEngine
      systems={[Physics]}
      ref={gameEngineRef}
      running={isRunning}
      entities={entities()}
      onEvent={handleOnEvent}
      style={styles.engineContainer}
    />
  );
};

export { Game };
