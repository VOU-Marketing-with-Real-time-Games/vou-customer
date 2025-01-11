/* eslint-disable no-console */
import React from "react";
import { WEBSOCKET_URL, URL_QUIZ } from "@env";
import { IAnswerSocketDone, IConnectQuizSocket, ILeaderBoard, IQuizRecevie } from "../../types/socket";

const HandleGameSocket = () => {
  const [quizData, setQuizData] = React.useState<IQuizRecevie[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [isConnected, setIsConnected] = React.useState<boolean>(false);
  const wsRef = React.useRef<WebSocket | null>(null);
  const [gameStarted, setGameStarted] = React.useState<boolean>(false);
  const [gameStartedBefore, setGameStartedBefore] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log("gameStarted updated:", gameStarted);
  }, [gameStarted]);

  React.useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL + URL_QUIZ);
    wsRef.current = ws;

    ws.onopen = () => {
      // connection opened
      console.log("Game WebSocket connection opened");
      setIsConnected(true);
    };

    ws.onmessage = (e: WebSocketMessageEvent) => {
      console.log("Received message Top:", e.data, gameStarted);
      if (e.data.includes("Quiz already started") && !gameStarted) {
        console.log("Started game");
        setGameStartedBefore(true);
      } else if (!gameStarted && quizData.length === 0) {
        // receive list of quiz
        console.log(gameStarted, quizData.length);

        try {
          const receivedMessage = JSON.parse(e.data) as IQuizRecevie[];
          if (receivedMessage) {
            console.log("Received message:", receivedMessage);
            setQuizData(receivedMessage);
            setGameStarted(true);
          }
        } catch (err) {
          console.error("Error parsing Game WebSocket message:", err);
        }
      } else {
        // receive leaderboard message
        console.log("Received message leaderboard:", e.data);
        try {
          const receivedMessage = JSON.parse(e.data) as IQuizRecevie[];
          if (receivedMessage) {
            console.log("Received message:", receivedMessage);
          }
        } catch (err) {
          console.error("Error parsing Game WebSocket message:", err);
        }
      }
    };

    ws.onerror = (event: Event) => {
      console.error("Game WebSocket error:", event);
      setError("Game WebSocket encountered an error. Please try again.");
    };

    ws.onclose = (e) => {
      // connection closed
      console.log("Game WebSocket connection closed:", e.code, e.reason);
      setIsConnected(false);
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendAnswerComplete = (message: IAnswerSocketDone) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.warn("Game WebSocket is not open. Message not sent:", message);
    }
  };

  const connectQuizSocket = (quizAddress: IConnectQuizSocket) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(quizAddress));
      console.log("Sent message:", quizAddress);
    } else {
      console.warn("Game WebSocket is not open. Message not sent.");
    }
  };

  return {
    gameStarted,
    gameStartedBefore,
    quizData,
    error,
    isConnected,
    sendAnswerComplete,
    connectQuizSocket,
  };
};

export default HandleGameSocket;
