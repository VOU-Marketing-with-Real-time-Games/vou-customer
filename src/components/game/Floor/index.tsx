import { View } from "react-native";
import Matter from "matter-js";

import React from "react";
import { styles } from "./style";

interface Props {
  body: Matter.Body;
  color: string;
}

const Floor = ({ body, color }: Props) => {
  const widthBody = body.bounds.max.x - body.bounds.min.x;
  const heightBody = body.bounds.max.y - body.bounds.min.y;

  const xBody = body.position.x - widthBody / 2;
  const yBody = body.position.y - heightBody / 2;

  return (
    <View
      style={
        styles({
          widthBody,
          heightBody,
          xBody,
          yBody,
          color,
        }).floor
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
  const initialFloor = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: "Floor",
    isStatic: true,
  });

  Matter.World.add(world, [initialFloor]);

  return {
    body: initialFloor,
    color,
    pos,
    renderer: <Floor body={initialFloor} color={color} />,
  };
};
