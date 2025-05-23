import { ImageBackground, View } from "react-native";
import React from "react";

import { Text, Modal, Portal, Button } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { QUIZ_GAME_SOCKET } from "@env";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import tw from "../../lib/tailwind";
import SingleQuiz from "../../components/game/quiz/single-quiz";
import MainLayout from "../../layouts/main/main-layout";
import { VoucherGiftScreenName } from "../gift/gift";
import { IAnswerSocketDone, IConnectQuizSocket, ILeaderBoard, IQuizRecevie } from "../../types/socket";
import LeaderBoard from "../../components/game/leader-board";
import GameStarted from "../../components/game/game-started";
import WaitingStartGame from "../../components/game/waiting-start-game";
import { AppState } from "../../store";
import { IIncreasePlayTurnReq } from "../../types/user";
import { userApi } from "../../api/user.api";

type RouteParams = {
  params: {
    quizzId: number;
  };
};

const QuizGameScreen = ({ route }: { route: RouteParams }) => {
  const { quizzId } = route.params;

  const user = useSelector((state: AppState) => state.user);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isEndGame, setIsEndGame] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const [quizData, setQuizData] = React.useState<IQuizRecevie[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const wsRef = React.useRef<WebSocket | null>(null);
  const [gameStarted, setGameStarted] = React.useState<boolean>(false);
  const [gameStartedBefore, setGameStartedBefore] = React.useState<boolean>(false);
  const [showQuizScreen, setShowQuizScreen] = React.useState(false);
  const [leaderBoard, setLeaderBoard] = React.useState<ILeaderBoard[]>([]);

  const gameStartedRef = React.useRef(gameStarted);
  const quizDataRef = React.useRef(quizData);
  const showQuizScreenRef = React.useRef(showQuizScreen);
  const leaderBoardRef = React.useRef(leaderBoard);
  const [showLeaderboard, setShowLeaderboard] = React.useState(false);

  const showModal = () => setVisible(true);

  // const decreasePlayTurnMutation = useMutation({
  //   mutationFn: (body: IIncreasePlayTurnReq) => userApi.decreasePlayTurn(body),
  // });

  React.useEffect(() => {
    gameStartedRef.current = gameStarted;
    quizDataRef.current = quizData;
    showQuizScreenRef.current = showQuizScreen;
  }, [gameStarted, quizData, showQuizScreen]);

  React.useEffect(() => {
    leaderBoardRef.current = leaderBoard;
  }, [leaderBoard]);

  React.useEffect(() => {
    if (showQuizScreen) {
      // trừ lượt chơi đi 1
      // decreasePlayTurnMutation.mutate({
      //   userID: user.id!,
      //   quantity: 1,
      //   method: "describe",
      // });
    }
  }, [showQuizScreen]);

  // socket handlers

  const connectQuizSocket = (quizAddress: IConnectQuizSocket) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(quizAddress));
      console.log("Sent message:", quizAddress);
    } else {
      console.warn("Game WebSocket is not open. Message not sent.");
    }
  };

  React.useEffect(() => {
    const ws = new WebSocket(QUIZ_GAME_SOCKET);
    wsRef.current = ws;

    ws.onopen = () => {
      // connection opened
      console.log("Game WebSocket connection opened");
      connectQuizSocket({
        type: "CONNECT_QUIZ",
        userId: user.id?.toString() || "0",
        quizzId: quizzId.toString(),
      });
    };

    ws.onmessage = (e: WebSocketMessageEvent) => {
      console.log("Received message Top:", e.data, gameStarted);
      if (e.data.includes("Quiz already started") && !gameStarted) {
        console.log("Started game");
        setGameStartedBefore(true);
      } else if (!gameStartedRef.current && quizDataRef.current.length === 0 && !showQuizScreenRef.current) {
        // receive list of quiz
        console.log("Condition met:", gameStartedRef.current, quizDataRef.current.length);

        try {
          const receivedMessage = JSON.parse(e.data) as IQuizRecevie[];
          if (receivedMessage) {
            console.log("Received message:", receivedMessage);
            setQuizData(receivedMessage);
            setGameStarted(true);
            setShowQuizScreen(true);
          }
        } catch (err) {
          console.error("Error parsing Game WebSocket message:", err);
        }
      } else {
        // receive leaderboard message
        console.log("Received message leaderboard:", e.data);
        try {
          const receivedMessage = JSON.parse(e.data) as ILeaderBoard[];
          if (receivedMessage) {
            setLeaderBoard(receivedMessage);
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

  React.useEffect(() => {
    if (isEndGame) {
      setShowLeaderboard(false);
      showModal();
    }
  }, [isEndGame]);

  const socketSendAnswerComplete = () => {
    // send socket message, nguoi choi da hoan thanh cau nay va da gui dap an ve server
    sendAnswerComplete({
      type: "ANSWER_COMPLETE",
      userId: user.id?.toString() || "0",
      quizzId: quizzId.toString(),
    });
  };

  return (
    <MainLayout>
      {showQuizScreen && quizData.length > 0 ? (
        <ImageBackground
          source={require("../../../assets/images/game/quiz-background.jpg")}
          style={tw`flex-1 text-white`}
          blurRadius={3}
        >
          <SingleQuiz
            questions={quizData}
            duration={10}
            setIsEndGame={setIsEndGame}
            isEndGame={isEndGame}
            setScore={setScore}
            socketSendAnswerComplete={socketSendAnswerComplete}
            setShowLeaderBoard={setShowLeaderboard}
          />
          {/* leader board */}
          <LeaderBoard visible={showLeaderboard && !isEndGame} leaderBoard={leaderBoard} />
          {/* end game */}
          <Portal>
            <Modal visible={visible} contentContainerStyle={tw`rounded-2xl mx-2 p-4 bg-white gap-8`}>
              <View style={tw`gap-2`}>
                <Text variant="displaySmall" style={tw`font-bold text-center`}>
                  Congratulations!
                </Text>
                <Text variant="displaySmall" style={tw`font-bold text-center`}>
                  {score}/{quizData.length}
                </Text>
              </View>
              <View style={tw`gap-3`}>
                <Button
                  mode="contained"
                  style={tw`py-0.5`}
                  labelStyle={tw`text-xl`}
                  onPress={() => {
                    setVisible(false);
                    navigation.navigate(VoucherGiftScreenName);
                  }}
                >
                  Voucher
                </Button>
                <Button
                  mode="contained"
                  style={tw`py-0.5`}
                  labelStyle={tw`text-xl`}
                  onPress={() => {
                    setVisible(false);
                    navigation.goBack();
                  }}
                >
                  Return
                </Button>
              </View>
            </Modal>
          </Portal>
        </ImageBackground>
      ) : gameStartedBefore ? (
        <GameStarted />
      ) : (
        <WaitingStartGame />
      )}
    </MainLayout>
  );
};

export default QuizGameScreen;
