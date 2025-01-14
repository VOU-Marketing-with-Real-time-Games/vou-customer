import { Text, View, Share } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import tw from "../../lib/tailwind";
import { ICampaign } from "../../types/campaign";
import { userApi } from "../../api/user.api";
import { IIncreasePlayTurnReq } from "../../types/user";
import { IResError } from "../../types/response";

type Props = {
  campaign: ICampaign;
};

const GroupButtonSharing = ({ campaign }: Props) => {
  const increasePlayTurnMutation = useMutation({
    mutationFn: (body: IIncreasePlayTurnReq) => userApi.increasePlayTurn(body),
    onError: (error: AxiosError) => {
      Toast.show({
        type: "error",
        text1: "Chia sẻ không thành công",
        text2: (error.response?.data as IResError)?.errors[0] || "Vui lòng thử lại sau",
      });
    },
    onSuccess: () => {
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Bạn nhận được 1 lượt chơi mới",
        });
      }, 2000);
    },
  });

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
          increasePlayTurnMutation.mutate({ userID: 15, method: "share", quantity: 1 });
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
