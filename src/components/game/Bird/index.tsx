import { Image } from "react-native";
import Matter from "matter-js";

import React from "react";
import { styles } from "./style";

import BIRD from "../../../../assets/images/game/flappy-bird/bird.png";

interface Props {
  body: Matter.Body;
  color: string;
}

const Bird = ({ body, color }: Props) => {
  const widthBody = body.bounds.max.x - body.bounds.min.x;
  const heightBody = body.bounds.max.y - body.bounds.min.y;

  const xBody = body.position.x - widthBody / 2;
  const yBody = body.position.y - heightBody / 2;

  return (
    <Image
      source={BIRD}
      style={
        styles({
          widthBody,
          heightBody,
          xBody,
          yBody,
          color,
        }).bird
      }
    />
  );
};

export default (
  world: Matter.World,
  color: string,
  pos: { x: number; y: number },
  size: { width: number; height: number },
) => {
  const initialBird = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, { label: "Bird" });

  Matter.World.add(world, [initialBird]);

  return {
    body: initialBird,
    color,
    pos,
    renderer: <Bird body={initialBird} color={color} />,
  };
};
