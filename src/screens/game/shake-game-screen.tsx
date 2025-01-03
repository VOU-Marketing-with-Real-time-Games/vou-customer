import { Image, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { Accelerometer, AccelerometerMeasurement } from "expo-sensors";
import { Subscription } from "expo-sensors/build/DeviceSensor";
import tw from "../../lib/tailwind";

const SHAKE_THRESHOLD = 4;
const ShakeGameScreen = () => {
  const [count, setCount] = React.useState(0);
  const [subscription, setSubscription] = React.useState<Subscription | null>(null);

  // Detect shake by evaluating the magnitude of acceleration
  const detectShake = (accelerometerData: AccelerometerMeasurement) => {
    const { x, y, z } = accelerometerData;
    const totalAcceleration = Math.sqrt(x * x + y * y + z * z);

    if (totalAcceleration > SHAKE_THRESHOLD) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  React.useEffect(() => {
    // Subscribe to the accelerometer
    const subscribe = () => {
      const sub = Accelerometer.addListener((accelerometerData: AccelerometerMeasurement) => {
        detectShake(accelerometerData);
      });
      Accelerometer.setUpdateInterval(16); // Set update interval to ~60Hz (16ms)
      setSubscription(sub);
    };

    subscribe();

    return () => {
      // Unsubscribe when the component unmounts
      subscription?.remove();
      setSubscription(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={tw`flex-1 justify-center items-center gap-10`}>
      <Text variant="titleLarge">Shake your phone to receive a gift.</Text>
      <Image
        source={require("../../../assets/images/game/shake/shake_phone.png")}
        alt="Shake phone"
        style={tw`w-44 h-44`}
      />
      <Text variant="displayLarge">Score: {count}</Text>
    </View>
  );
};
export default ShakeGameScreen;
