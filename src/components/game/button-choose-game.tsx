import { TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { Button, Icon, Text, Modal, Portal } from "react-native-paper";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import tw from "../../lib/tailwind";
import { FlappyBirdGameScreenName, QuizGameScreenName, ShakeGameScreenName } from "../../screens/game/game";

const ButtonChooseGame = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <View>
      <Button
        contentStyle={tw`flex-row-reverse items-center`}
        labelStyle={tw`text-xl`}
        mode="contained"
        onPress={showModal}
      >
        <View style={tw`flex-row items-center gap-4`}>
          <Text variant="titleLarge" style={tw`text-white`}>
            Choose game
          </Text>
          <Icon source="gamepad-variant" size={32} color="white" />
        </View>
      </Button>
      {/* modal */}
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={tw`py-10 px-5 bg-white gap-4`}>
          {/* Shake game */}
          <TouchableOpacity
            onPress={() => {
              hideModal();
              navigation.navigate(ShakeGameScreenName);
            }}
          >
            <Image
              source={require("../../../assets/images/game/shake.png")}
              width={250}
              height={80}
              style={[tw`h-22 w-full rounded-xl`]}
              alt="Quiz Game Image"
            />
          </TouchableOpacity>

          {/* Flappy Bird Game */}
          <TouchableOpacity
            onPress={() => {
              hideModal();
              navigation.navigate(FlappyBirdGameScreenName);
            }}
          >
            <Image
              source={require("../../../assets/images/game/flappy-bird.jpg")}
              width={250}
              height={80}
              style={tw`h-22 w-full rounded-xl`}
              alt="Flappy Bird Image"
            />
          </TouchableOpacity>

          {/* Quiz Game */}
          <TouchableOpacity
            onPress={() => {
              hideModal();
              navigation.navigate(QuizGameScreenName);
            }}
          >
            <Image
              source={require("../../../assets/images/game/quiz.jpg")}
              width={250}
              height={80}
              style={tw`h-22 w-full rounded-xl`}
              alt="Quiz Game Image"
            />
          </TouchableOpacity>
        </Modal>
      </Portal>
    </View>
  );
};

export default ButtonChooseGame;
