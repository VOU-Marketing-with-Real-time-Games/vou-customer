import { Text, View, Share } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import tw from "../../lib/tailwind";
import { ICampaign } from "../../types/campaign";

type Props = {
  campaign: ICampaign;
};

const GroupButtonSharing = ({ campaign }: Props) => {
  const share = async () => {
    try {
      const result = await Share.share({
        message: `Join ${campaign.name}'s game to receive many valuable gifts ❤❤❤`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared => add turn increse turn
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={tw`flex-row items-center justify-center gap-8`}>
      <Button icon="account-plus" mode="contained" buttonColor="#16C47F" onPress={share}>
        Invite
      </Button>
      <Button icon="share" mode="contained" buttonColor="#344CB7" onPress={share}>
        Share
      </Button>
    </View>
  );
};

export default GroupButtonSharing;
