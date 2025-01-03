import { Dimensions } from "react-native";
import Matter from "matter-js";

import { getPipeSizePosPair } from "./random";

const windowWidth = Dimensions.get("window").width;

export const Physics = (entities, { touches, time, dispatch }) => {
  const { engine } = entities.physics;

  // Lấy đối tượng Bird
  const bird = entities.Bird.body;

  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      Matter.Body.setVelocity(entities.Bird.body, {
        x: 0,
        y: -4,
      });
    });

  for (let index = 1; index <= 2; index += 1) {
    const obstacleTop = entities[`ObstacleTop${index}`].body;
    const obstacleBottom = entities[`ObstacleBottom${index}`].body;

    if (obstacleTop.bounds.max.x <= 0) {
      const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);

      Matter.Body.setPosition(obstacleTop, pipeSizePos.pipeTop.pos);
      Matter.Body.setPosition(obstacleBottom, pipeSizePos.pipeBottom.pos);

      obstacleTop.passed = false;
    }

    Matter.Body.translate(obstacleTop, { x: -3, y: 0 });
    Matter.Body.translate(obstacleBottom, {
      x: -3,
      y: 0,
    });

    if (!obstacleTop.passed && bird.position.x > obstacleTop.position.x) {
      obstacleTop.passed = true; // Đánh dấu cột đã được vượt qua
      entities.score += 1; // Tăng điểm
      dispatch({ type: "increase_score" }); // Gửi sự kiện tăng điểm
    }
  }

  Matter.Engine.update(engine, time.delta);

  Matter.Events.on(engine, "collisionStart", () => {
    dispatch({ type: "game_over" });
  });

  return entities;
};
