import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import tw from "../../../lib/tailwind";

type Props = {
  questionCount: number;
  question: string;
  options: string[];
  duration: number;
  maxQuestions: number;
  answer: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setIsEndGame: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
};

const styles = StyleSheet.create({
  singleAnswer: {
    backgroundColor: "rgba(0, 0, 110, 0.8)",
    borderWidth: 3,
    borderColor: "rgba(0, 0, 255, 1)",
  },
  disableAnswer: {
    backgroundColor: "rgba(110, 110, 110, 0.8)",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 1)",
  },
  disableText: {
    color: "#a1a1a1",
  },
  selectedAnswer: {
    backgroundColor: "rgba(110, 110, 0, 0.8)",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 0, 1)",
  },
  wrongAnswer: {
    backgroundColor: "rgba(110, 0, 0, 0.8)",
    borderWidth: 3,
    borderColor: "rgba(255, 0, 0, 1)",
  },
  trueAnswer: {
    backgroundColor: "rgba(0, 100, 0, 0.8)",
    borderWidth: 3,
    borderColor: "rgba(0, 255, 0, 1)",
  },
});

type GroupAnswerProps = {
  options: string[];
  selectedAnswer: number;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<number>>;
  answer: number;
  showAnswer: boolean;
};

const GroupAnswer = ({ options, setSelectedAnswer, selectedAnswer, answer, showAnswer }: GroupAnswerProps) => (
  <View style={tw`flex-col gap-4 mt-8 w-full px-1`}>
    {options.map((option, index) => (
      <TouchableOpacity
        style={[
          tw`px-5 py-3 rounded-2xl w-full flex-row items-center justify-between gap-2`,
          styles.singleAnswer,
          selectedAnswer !== -1 && styles.disableAnswer,
          selectedAnswer === index && styles.selectedAnswer,
          showAnswer && answer === index && styles.trueAnswer,
          showAnswer && answer !== index && selectedAnswer === index && styles.wrongAnswer,
        ]}
        key={option}
        onPress={() => setSelectedAnswer(index)}
        disabled={selectedAnswer !== -1}
      >
        <Text
          style={[tw`text-white`, selectedAnswer !== -1 && selectedAnswer !== index && styles.disableText]}
          variant="headlineMedium"
        >
          {option}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const SingleQuiz = ({
  questionCount,
  question,
  options,
  setCurrentQuestion,
  maxQuestions,
  answer,
  setIsEndGame,
  setScore,
  duration = 10,
}: Props) => {
  const [selectedAnswer, setSelectedAnswer] = React.useState<number>(-1);
  const [showAnswer, setShowAnswer] = React.useState(false);

  return (
    <View style={tw`justify-center items-center my-2 p-0.5`}>
      {/* Heading (quiz number, countdown) */}
      <View style={tw`flex-row w-full justify-between items-center gap-4 mb-8`}>
        <Text style={tw`text-white`} variant="displayMedium">
          Cau {questionCount}
        </Text>
        <CountdownCircleTimer
          isPlaying
          duration={duration}
          colors={["#33a3ee", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          size={90}
          onComplete={() => {
            if (selectedAnswer === -1) setSelectedAnswer(5);
            setShowAnswer(true);
            if (selectedAnswer === answer) setScore((prev) => prev + 1);
            if (questionCount < maxQuestions) {
              setTimeout(() => {
                setShowAnswer(false);
                setCurrentQuestion((prev) => prev + 1);
                setSelectedAnswer(-1);
              }, 2000);
              return { shouldRepeat: true, delay: 2 };
            }
            setIsEndGame(true);
            return { shouldStop: true };
          }}
        >
          {({ remainingTime }) => (
            <Text style={tw`text-white`} variant="displaySmall">
              {remainingTime}
            </Text>
          )}
        </CountdownCircleTimer>
      </View>
      {/* quiz content */}
      <Text style={tw`text-white`} variant="displaySmall">
        {question}
      </Text>
      {/* Answers */}
      <GroupAnswer
        options={options}
        setSelectedAnswer={setSelectedAnswer}
        selectedAnswer={selectedAnswer}
        answer={answer}
        showAnswer={showAnswer}
      />
    </View>
  );
};

export default SingleQuiz;
