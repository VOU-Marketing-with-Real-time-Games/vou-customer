import { ImageBackground, View } from "react-native";
import React from "react";

import BACKGROUND from "../../../assets/images/game/flappy-bird/background.png";
import tw from "../../lib/tailwind";
import { Game } from "./flappyBird";

const FlappyBirdGameScreen = () => (
  <ImageBackground source={BACKGROUND} style={tw`flex-1 bg-[#71C5CF]`}>
    <Game />
  </ImageBackground>
);

export default FlappyBirdGameScreen;
