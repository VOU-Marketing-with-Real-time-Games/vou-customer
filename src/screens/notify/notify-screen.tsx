import { ScrollView, View } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import tw from "../../lib/tailwind";
import notificationApi from "../../api/notification.api";
import { AppState } from "../../store";
import { INotify } from "../../types/notify";
import SingleNotify from "../../components/notify/single-notify";

const NotifyScreen = () => {
  const [notifications, setNotifications] = React.useState<INotify[] | null>(null);
  const user = useSelector((state: AppState) => state.user);

  const getCampaignsByName = useQuery({
    queryKey: ["list-notify"],
    queryFn: async () => {
      const response: INotify[] = await notificationApi.getAllNotifications(user.userId!);
      setNotifications(response);
      return response;
    },
  });

  return (
    <View style={tw`mt-1 flex-1`}>
      {getCampaignsByName.isLoading || getCampaignsByName.isFetching ? (
        <NotifyScreen.Skeleton />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={tw`mt-3`}>
          <View style={tw`gap-5`}>
            {notifications?.map((notify) => (
              <View key={notify.id}>
                <SingleNotify notify={notify} />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default NotifyScreen;

NotifyScreen.Skeleton = () => (
  <ScrollView showsVerticalScrollIndicator={false} style={tw`mt-3`}>
    <View style={tw`gap-3`}>
      {Array.from({ length: 4 }, (_, i) => (
        <View style={tw`bg-gray-200 rounded-lg px-4 w-full h-40`} key={i} />
      ))}
    </View>
  </ScrollView>
);
