import { View } from "react-native";
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
    <View style={tw`mt-5`}>
      <Text variant="displayLarge">Shake: {count}</Text>
    </View>
  );
};
export default ShakeGameScreen;
