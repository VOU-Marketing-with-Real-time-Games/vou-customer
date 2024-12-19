import { Image } from "react-native";
import Matter from "matter-js";

import React from "react";
import { styles } from "./style";

import PIPE_GREEN from "../../../../assets/images/game/flappy-bird/pipe-green.png";
import PIPE_GREEN_INVERTED from "../../../../assets/images/game/flappy-bird/pipe-green-inverted.png";
import PIPE_ORANGE from "../../../../assets/images/game/flappy-bird/pipe-orange.png";
import PIPE_ORANGE_INVERTED from "../../../../assets/images/game/flappy-bird/pipe-orange-inverted.png";

interface Props {
  body: Matter.Body;
  color: string;
  isTop: boolean;
}

const Obstacle = ({ body, color, isTop = true }: Props) => {
  const widthBody = body.bounds.max.x - body.bounds.min.x;
  const heightBody = body.bounds.max.y - body.bounds.min.y;

  const xBody = body.position.x - widthBody / 2;
  const yBody = body.position.y - heightBody / 2;

  function selectImage(clr: string) {
    if (clr === "green") {
      if (!isTop) return PIPE_GREEN;
      return PIPE_GREEN_INVERTED;
    }
    if (!isTop) return PIPE_ORANGE;
    return PIPE_ORANGE_INVERTED;
  }

  return (
    <Image
      source={selectImage(color)}
      style={
        styles({
          widthBody,
          heightBody,
          xBody,
          yBody,
          color,
        }).obstacle
      }
    />
  );
};

export default (
  world: Matter.World,
  label: string,
  color: string,
  pos: { x: number; y: number },
  size: { width: number; height: number },
  isTop = false,
) => {
  const initialObstacle = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, { label, isStatic: true });

  Matter.World.add(world, [initialObstacle]);

  return {
    body: initialObstacle,
    color,
    pos,
    isTop,
    renderer: <Obstacle body={initialObstacle} color={color} isTop={isTop} />,
  };
};
