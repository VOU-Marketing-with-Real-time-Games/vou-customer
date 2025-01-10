import { Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import tw from "../../lib/tailwind";

const GroupButtonSharing = () => (
  <View style={tw`flex-row items-center justify-center gap-8`}>
    <Button icon="account-plus" mode="contained" buttonColor="#16C47F" onPress={() => {}}>
      Invite
    </Button>
    <Button icon="share" mode="contained" buttonColor="#344CB7" onPress={() => {}}>
      Share
    </Button>
  </View>
);

export default GroupButtonSharing;
