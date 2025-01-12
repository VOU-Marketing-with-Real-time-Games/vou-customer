import React, { useRef, useState } from "react";
import { GameEngine } from "react-native-game-engine";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./style";

import { Start } from "./Start";
import { GameOver } from "./GameOver";
import { Physics } from "../../../utils/physics";

import entities from "../../../components/game/entities";
import tw from "../../../lib/tailwind";

const Game = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState<number>(0);

  const gameEngineRef = useRef(null);

  const handleOnStartGame = () => {
    setIsRunning(true);
    setIsGameOver(false);
    setScore(0);
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
      case "increase_score":
        setScore((prev) => prev + 1);
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    if (score > 2) {
      handleOnGameOver();
    }
  }, [score]);

  if (!isRunning && !isGameOver) {
    return <Start handleOnStartGame={handleOnStartGame} />;
  }
  if (!isRunning && isGameOver) {
    return <GameOver score={score} />;
  }

  return (
    <>
      <GameEngine
        systems={[Physics]}
        ref={gameEngineRef}
        running={isRunning}
        entities={entities()}
        onEvent={handleOnEvent}
        style={styles.engineContainer}
      />
      <View style={tw`absolute top-12 left-0 p-2 rounded-full w-full flex-row justify-center`}>
        <Text variant="displayLarge" style={tw`text-white font-bold`}>
          {score}
        </Text>
      </View>
    </>
  );
};

export { Game };
