import { View, Share } from "react-native";
import React from "react";
import { Button, Text, Icon, MD3Colors } from "react-native-paper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import tw from "../../lib/tailwind";
import { ICampaign } from "../../types/campaign";
import { userApi } from "../../api/user.api";
import { IIncreasePlayTurnReq } from "../../types/user";
import { IResError } from "../../types/response";
import { AppState } from "../../store";

type Props = {
  campaign: ICampaign;
};

const GroupButtonSharing = ({ campaign }: Props) => {
  const [playTurn, setPlayTurn] = React.useState<number | null>(null);
  const user = useSelector((state: AppState) => state.user);

  const getPlayTurnQuery = useQuery({
    queryKey: ["play-turn"],
    queryFn: async () => {
      const res = await userApi.getPlayTurn(user.userId!);
      setPlayTurn(res);
      return res;
    },
    gcTime: 0,
    enabled: user.userId !== null,
  });

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
        getPlayTurnQuery.refetch();
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
    <>
      <View style={tw`flex-row items-center justify-center gap-8`}>
        <Button icon="account-plus" mode="contained" buttonColor="#16C47F" onPress={share}>
          Invite
        </Button>
        <Button icon="share" mode="contained" buttonColor="#344CB7" onPress={share}>
          Share
        </Button>
      </View>
      <View style={tw`flex-row items-center gap-3 bg-green-100 p-2 rounded-xl`}>
        <View style={tw`bg-blue-200 py-2 w-12 flex-row items-center justify-center rounded-lg`}>
          <Icon source="gamepad-variant" color={MD3Colors.primary20} size={30} />
        </View>
        <View style={tw``}>
          <Text style={tw`text-red-500 font-bold`} variant="bodyLarge">
            Remain turn: {playTurn || 0}
          </Text>
        </View>
      </View>
    </>
  );
};

export default GroupButtonSharing;
