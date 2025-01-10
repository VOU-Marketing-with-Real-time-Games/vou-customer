/* eslint-disable no-console */
import React from "react";
import { WEBSOCKET_URL, URL_QUIZ } from "@env";
import { IAnswerSocketDone, IConnectQuizSocket, IQuizRecevie } from "../../types/socket";

const HandleGameSocket = () => {
  const [quizData, setQuizData] = React.useState<IQuizRecevie[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isConnected, setIsConnected] = React.useState<boolean>(false);
  const wsRef = React.useRef<WebSocket | null>(null);
  const [gameStarted, setGameStarted] = React.useState<boolean>(false);
  const [gameStartedBefore, setGameStartedBefore] = React.useState<boolean>(false);

  React.useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL + URL_QUIZ);
    wsRef.current = ws;

    ws.onopen = () => {
      // connection opened
      console.log("Game WebSocket connection opened");
      setIsConnected(true);
    };

    ws.onmessage = (e: WebSocketMessageEvent) => {
      if (typeof e.data === "string" && !gameStarted) {
        setGameStartedBefore(true);
      }
      // a message was received
      if (!gameStarted && !quizData) {
        // receive list of quiz
        setGameStarted(true);
        try {
          const receivedMessage = JSON.parse(e.data) as IQuizRecevie[];
          if (receivedMessage) {
            console.log("Received message:", receivedMessage);
            setQuizData(receivedMessage); // Update quiz data
          }
        } catch (err) {
          console.error("Error parsing Game WebSocket message:", err);
        }
      } else {
        // receive leaderboard message
        console.log("Received message:", e.data);
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

  return { gameStarted, gameStartedBefore, quizData, error, isConnected, sendAnswerComplete, connectQuizSocket };
};

export default HandleGameSocket;
