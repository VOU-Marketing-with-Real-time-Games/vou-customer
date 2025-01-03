import { ImageBackground, View } from "react-native";
import React from "react";

import { Text, Modal, Portal, Button } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import tw from "../../lib/tailwind";
import SingleQuiz from "../../components/game/quiz/single-quiz";
import MainLayout from "../../layouts/main/main-layout";
import question from "../../../mock/quiz.json";

const QuizGameScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [isEndGame, setIsEndGame] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);

  React.useEffect(() => {
    if (isEndGame) {
      showModal();
    }
  }, [isEndGame]);

  return (
    <MainLayout>
      <ImageBackground
        source={require("../../../assets/images/game/quiz-background.jpg")}
        style={tw`flex-1 text-white`}
        blurRadius={3}
      >
        <SingleQuiz
          question={question[currentQuestion].question}
          questionCount={currentQuestion + 1}
          options={question[currentQuestion].options}
          duration={10}
          answer={question[currentQuestion].answer}
          setCurrentQuestion={setCurrentQuestion}
          maxQuestions={question.length}
          setIsEndGame={setIsEndGame}
          setScore={setScore}
        />
        {/* end game */}
        <Portal>
          <Modal visible={visible} contentContainerStyle={tw`rounded-2xl mx-2 p-4 bg-white gap-8`}>
            <View style={tw`gap-2`}>
              <Text variant="displaySmall" style={tw`font-bold text-center`}>
                Congratulations!
              </Text>
              <Text variant="displaySmall" style={tw`font-bold text-center`}>
                {score}/{question.length}
              </Text>
            </View>
            <View style={tw`gap-3`}>
              <Button mode="contained" style={tw`py-0.5`} labelStyle={tw`text-xl`}>
                Voucher
              </Button>
              <Button mode="contained" style={tw`py-0.5`} labelStyle={tw`text-xl`} onPress={() => navigation.goBack()}>
                Return
              </Button>
            </View>
          </Modal>
        </Portal>
      </ImageBackground>
    </MainLayout>
  );
};

export default QuizGameScreen;
