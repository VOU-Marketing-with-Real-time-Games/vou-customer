import { View } from "react-native";
import React from "react";
import { Button, Icon, Text, Modal, Portal } from "react-native-paper";
import tw from "../../lib/tailwind";

const ButtonChooseGame = () => {
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
          <Button mode="contained">Shake Game</Button>
        </Modal>
      </Portal>
    </View>
  );
};

export default ButtonChooseGame;
