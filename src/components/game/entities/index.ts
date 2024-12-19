import { Dimensions } from "react-native";
import Matter from "matter-js";

import Bird from "../Bird";
import Floor from "../Floor";
import Obstacle from "../Obstacle";

import { getPipeSizePosPair } from "../../../utils/random";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const BOTTOM = 51;

export default () => {
  const engine = Matter.Engine.create({
    enableSleeping: false,
  });

  const { world } = engine;

  engine.gravity.y = 0.4;

  const pipeSizePosA = getPipeSizePosPair();
  const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9);

  return {
    physics: { engine, world },
    Bird: Bird(world, "green", { x: 120, y: 400 }, { height: 40, width: 40 }),

    ObstacleTop1: Obstacle(world, "ObstacleTop1", "green", pipeSizePosA.pipeTop.pos, pipeSizePosA.pipeTop.size, true),

    ObstacleBottom1: Obstacle(
      world,
      "ObstacleBottom1",
      "green",
      pipeSizePosA.pipeBottom.pos,
      pipeSizePosA.pipeBottom.size,
      false,
    ),

    ObstacleTop2: Obstacle(world, "ObstacleTop2", "green", pipeSizePosB.pipeTop.pos, pipeSizePosB.pipeTop.size, true),

    ObstacleBottom2: Obstacle(
      world,
      "ObstacleBottom2",
      "green",
      pipeSizePosB.pipeBottom.pos,
      pipeSizePosB.pipeBottom.size,
      false,
    ),

    Floor: Floor(
      world,
      "#E1D694",
      { x: windowWidth / 2, y: windowHeight - 17 },
      { height: BOTTOM + 20, width: windowWidth },
    ),
  };
};
