import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Surface, Text } from "react-native-paper";
import tw from "../../lib/tailwind";
import { INotify } from "../../types/notify";
import { formatDateTimeNotify } from "../../utils/date-format";

type Props = {
  notify: INotify;
};

const SingleNotify = ({ notify }: Props) => (
  <TouchableOpacity onPress={() => {}}>
    <Surface style={[tw`p-2`, tw`gap-3 flex-row flex-1 rounded-lg`, notify.isRead ? tw`bg-blue-50` : tw`bg-white`]}>
      <View style={tw`gap-2 flex justify-center`}>
        <Text variant="bodyMedium" style={tw`font-bold`}>
          {notify.content}
        </Text>
        <Text variant="bodySmall">{formatDateTimeNotify(notify.createdAt)}</Text>
      </View>
    </Surface>
  </TouchableOpacity>
);

export default SingleNotify;
