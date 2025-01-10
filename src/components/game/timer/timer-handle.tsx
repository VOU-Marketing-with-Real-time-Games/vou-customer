import { View } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import tw from "../../../lib/tailwind";

type Props = {
  duration: number;
  onTimeOut: () => Promise<void>;
};

const TimerHandle = ({ duration, onTimeOut }: Props) => {
  const [timeLeft, setTimeLeft] = React.useState(duration);
  const [isRunning, setIsRunning] = React.useState(true);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timeLeft > 0 && !isRunning) {
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const handleTimeOut = async () => {
    await onTimeOut(); // Gọi hàm bất đồng bộ từ props
    resetTimer(); // Reset timer sau khi hoàn thành
  };

  React.useEffect(() => {
    if (isRunning) {
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
  }, [isRunning]);

  return (
    <View>
      <Text style={tw`text-white`} variant="displaySmall">
        {timeLeft}
      </Text>
    </View>
  );
};

export default TimerHandle;
