import { View, Image, TouchableWithoutFeedback } from "react-native";

import React from "react";
import { styles } from "./style";

import LOGO from "../../../../../assets/images/game/flappy-bird/logo.png";
import PLAY from "../../../../../assets/images/game/flappy-bird/play.png";

type Props = {
  handleOnStartGame: () => void;
};

const Start = ({ handleOnStartGame }: Props) => (
  <View style={styles.container}>
    <Image source={LOGO} style={styles.logo} />
    <TouchableWithoutFeedback onPress={handleOnStartGame}>
      <Image source={PLAY} style={styles.playButton} />
    </TouchableWithoutFeedback>
  </View>
);

export { Start };
