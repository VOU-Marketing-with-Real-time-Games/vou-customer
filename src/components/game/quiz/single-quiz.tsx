import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import tw from "../../../lib/tailwind";
import { IQuizRecevie } from "../../../types/socket";
import { convertAnswerCharToInt, convertAnswerIntToChar } from "../../../utils/quiz";
import quizApi from "../../../api/quiz.api";

type Props = {
  questions: IQuizRecevie[];
  duration: number;
  isEndGame: boolean;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setIsEndGame: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLeaderBoard: React.Dispatch<React.SetStateAction<boolean>>;
  socketSendAnswerComplete: () => void;
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
        key={`${option}-${index + 1}`}
        style={[
          tw`px-5 py-3 rounded-2xl w-full flex-row items-center justify-between gap-2`,
          styles.singleAnswer,
          selectedAnswer !== -1 && styles.disableAnswer,
          selectedAnswer === index && styles.selectedAnswer,
          showAnswer && answer === index && styles.trueAnswer,
          showAnswer && answer !== index && selectedAnswer === index && styles.wrongAnswer,
        ]}
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
  questions,
  isEndGame,
  setIsEndGame,
  setScore,
  setShowLeaderBoard,
  socketSendAnswerComplete,
  duration = 10,
}: Props) => {
  const [selectedAnswer, setSelectedAnswer] = React.useState<number>(-1);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(duration);
  const [isRunning, setIsRunning] = React.useState(true);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  const startTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const OnTimeOut = async () => {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    // Khi hết thời gian đếm ngược
    // chưa chọn câu trả lời => đặt thành không chọn trong 4 đáp án
    if (selectedAnswer === -1) {
      setSelectedAnswer(4);
      // gửi trả lời của user về server
      await quizApi.setUserAnswer({
        userId: 3,
        questionId: questions[currentQuestion].id,
        answer: convertAnswerIntToChar(selectedAnswer),
        answerTime: 0,
      });
    }
    // gửi xác nhận user này đã trả lời xong
    socketSendAnswerComplete();
    // hiển thị đáp án đúng
    setShowAnswer(true);
    // tăng điểm nếu trả lời đúng
    if (selectedAnswer === convertAnswerCharToInt(questions[currentQuestion].answer)) setScore((prev) => prev + 1);
    // dừng 2s để show kết quả
    await delay(2000);
    // show bang xep hang sau cau hoi nay
    setShowLeaderBoard(true);
    await delay(5000);
    setShowLeaderBoard(false);
    // chuyển câu hỏi tiếp theo (nếu còn)
    if (currentQuestion < questions.length - 1) {
      setShowAnswer(false);
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(-1);
    } else {
      // hết câu hỏi => end question
      setIsEndGame(true);
    }
  };

  const handleTimeOut = async () => {
    await OnTimeOut(); // Gọi hàm bất đồng bộ từ props
    resetTimer(); // Reset timer sau khi hoàn thành
    setTimeout(() => startTimer(), 0); // Đảm bảo khởi động lại sau khi reset
  };

  React.useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            setIsRunning(false);
            handleTimeOut(); // Gọi hàm khi hết thời gian
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, timeLeft]);

  React.useEffect(() => {
    async function sendAnswer() {
      await quizApi.setUserAnswer({
        userId: 3,
        questionId: questions[currentQuestion].id,
        answer: convertAnswerIntToChar(selectedAnswer),
        answerTime: timeLeft,
      });
    }
    if (selectedAnswer !== -1) {
      sendAnswer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAnswer]);

  return (
    <View style={tw`justify-center items-center my-2 p-0.5`}>
      {/* Heading (quiz number, countdown) */}
      <View style={tw`flex-row w-full justify-between items-center gap-4 mb-8`}>
        <Text style={tw`text-white`} variant="displayMedium">
          Cau {currentQuestion + 1}
        </Text>
        {!isEndGame && (
          <View>
            <Text style={tw`text-white`} variant="displaySmall">
              {timeLeft}
            </Text>
          </View>
        )}
      </View>
      {/* quiz content */}
      <Text style={tw`text-white`} variant="displaySmall">
        {questions[currentQuestion].questionName}
      </Text>
      {/* Answers */}
      <GroupAnswer
        options={[
          questions[currentQuestion].option1,
          questions[currentQuestion].option2,
          questions[currentQuestion].option3,
          questions[currentQuestion].option4,
        ]}
        setSelectedAnswer={setSelectedAnswer}
        selectedAnswer={selectedAnswer}
        answer={convertAnswerCharToInt(questions[currentQuestion].answer)}
        showAnswer={showAnswer}
      />
    </View>
  );
};

export default SingleQuiz;
