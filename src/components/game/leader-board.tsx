import { View, Image } from "react-native";
import React from "react";
import { Text, Modal, Portal } from "react-native-paper";
import tw from "../../lib/tailwind";
import { ILeaderBoard } from "../../types/socket";

type Props = {
  visible: boolean;
  leaderBoard: ILeaderBoard[];
};

const LeaderBoard = ({ visible, leaderBoard }: Props) => (
  <Portal>
    <Modal visible={visible} contentContainerStyle={tw`rounded-2xl mx-2 p-4 bg-white gap-8`}>
      <View style={tw`gap-2`}>
        <Text variant="displaySmall" style={tw`font-bold text-center`}>
          Leader Board
        </Text>
        {leaderBoard.map((leader, index) => (
          <View key={leader.userId} style={tw`flex-row items-center gap-2`}>
            <Text variant="headlineSmall" style={tw`font-bold`}>
              {index + 1}
            </Text>
            <Image
              source={{
                uri: leader?.imageUrl ? leader.imageUrl : "https://avatar.iran.liara.run/public",
              }}
              style={tw`w-10 h-10 rounded-full`}
            />
            <Text variant="headlineSmall" style={tw`font-bold`}>
              {leader.fullName}
            </Text>
            <Text variant="headlineSmall" style={tw`font-bold`}>
              {leader.totalScore}
            </Text>
          </View>
        ))}
      </View>
    </Modal>
  </Portal>
);

export default LeaderBoard;
