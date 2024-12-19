import React, { useEffect } from "react";
import { View, Image } from "react-native";

import { styles } from "./style";

import GAME_OVER from "../../../../../assets/images/game/flappy-bird/game-over.png";

type Props = {
  handlebackToStart: () => void;
};

const GameOver = ({ handlebackToStart }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      handlebackToStart();
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Image source={GAME_OVER} style={styles.logo} />
    </View>
  );
};

export { GameOver };
