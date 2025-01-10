import { ImageBackground, View } from "react-native";
import React from "react";

import { Text, Modal, Portal, Button } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import tw from "../../lib/tailwind";
import SingleQuiz from "../../components/game/quiz/single-quiz";
import MainLayout from "../../layouts/main/main-layout";
import { VoucherGiftScreenName } from "../gift/gift";
import HandleGameSocket from "../../socket/game-socket/handle-game-socket";

const QuizGameScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [isEndGame, setIsEndGame] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);

  // socket handlers
  const [showQuizScreen, setShowQuizScreen] = React.useState(false);
  const { isConnected, gameStarted, connectQuizSocket, quizData, sendAnswerComplete, gameStartedBefore } =
    HandleGameSocket();

  React.useEffect(() => {
    if (isEndGame) {
      showModal();
    }
  }, [isEndGame]);

  React.useEffect(() => {
    if (!gameStarted && isConnected) {
      connectQuizSocket({
        type: "CONNECT_QUIZ",
        userId: "2",
        quizzId: "1",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  React.useEffect(() => {
    if (quizData) {
      setShowQuizScreen(true);
    }
  }, [quizData]);

  const socketSendAnswerComplete = () => {
    // send socket message
    sendAnswerComplete({
      type: "ANSWER_COMPLETE",
      userId: "2",
      quizzId: "1",
    });
  };

  return (
    <MainLayout>
      {showQuizScreen && quizData ? (
        <ImageBackground
          source={require("../../../assets/images/game/quiz-background.jpg")}
          style={tw`flex-1 text-white`}
          blurRadius={3}
        >
          <SingleQuiz
            question={quizData[currentQuestion]}
            questionCount={currentQuestion + 1}
            duration={10}
            setCurrentQuestion={setCurrentQuestion}
            maxQuestions={quizData.length}
            setIsEndGame={setIsEndGame}
            isEndGame={isEndGame}
            setScore={setScore}
            socketSendAnswerComplete={socketSendAnswerComplete}
          />
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
        <Text>Quiz has started or ended</Text>
      ) : (
        <Text>Quiz hasn&apos;t started yet. Please wait until it starts</Text>
      )}
    </MainLayout>
  );
};

export default QuizGameScreen;
