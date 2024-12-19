import { StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { Accelerometer, AccelerometerMeasurement } from "expo-sensors";
import { Subscription } from "expo-sensors/build/DeviceSensor";
import tw from "../../lib/tailwind";

const SHAKE_THRESHOLD = 2;
const SHAKE_SLOP_TIME_MS = 500;
const ShakeGameScreen = () => {
  const [count, setCount] = React.useState(0);
  const [lastShakeTime, setLastShakeTime] = React.useState<Date | null>(null);
  const [subscription, setSubscription] = React.useState<Subscription | null>(null);

  // Detect shake by evaluating the magnitude of acceleration
  const detectShake = (accelerometerData: AccelerometerMeasurement) => {
    const { x, y, z } = accelerometerData;
    const totalAcceleration = Math.sqrt(x * x + y * y + z * z);

    if (totalAcceleration > SHAKE_THRESHOLD) {
      const now = new Date();
      if (now.getTime() - (lastShakeTime?.getTime() || now.getTime()) > SHAKE_SLOP_TIME_MS) {
        setCount((prevCount) => prevCount + 1);
      }
      setLastShakeTime(new Date());
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

const styles = StyleSheet.create({});
