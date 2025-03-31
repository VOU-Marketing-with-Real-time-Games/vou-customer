import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Portal, Modal, TextInput, Text } from "react-native-paper";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import tw from "../../lib/tailwind";
import { IFullItem, IPuzzle } from "../../types/puzzle";
import { AppState } from "../../store";
import puzzleApi from "../../api/puzzle.api";
import { userApi } from "../../api/user.api";
import { IUser } from "../../types/user";
import { MainNavigationName } from "../../navigation/main-navigation";

type RouteParams = {
  params: {
    puzzle: IPuzzle;
  };
};

const PuzzleScreen = ({ route }: { route: RouteParams }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { puzzle } = route.params;
  const user = useSelector((state: AppState) => state.user);
  const [puzzles, setPuzzles] = React.useState<IFullItem[] | null>(null);
  const row = Math.round(Math.sqrt(puzzle.itemNum));
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState("");
  const [emails, setEmails] = React.useState<IUser[]>([]);
  const [black, setBlack] = React.useState(false);
  const [sindex1, setIndex1] = React.useState(-1);
  const [sindex2, setIndex2] = React.useState(-1);
  const handleCloseMessage = () => {
    setVisible(false);
  };

  const getAllPuzzleItemsQuery = useQuery({
    queryKey: ["puzzle-items"],
    queryFn: async () => {
      const res = await puzzleApi.getUserItemsByPuzzleId(user.id!, puzzle.id);
      setPuzzles(res);
      return res;
    },
  });

  const searchEmailQuery = useQuery({
    queryKey: ["search-email", text],
    queryFn: async () => {
      const res = await userApi.searchByEmail(text);
      setEmails(res);
      return res;
    },
  });

  const handleShare = (have: boolean, index1: number, index2: number) => {
    if (!have) return;
    setIndex1(index1);
    setIndex2(index2);
    setVisible(true);
  };

  function checkHave(position: number) {
    if (!puzzles) return false;
    return puzzles.some((_puzzle) => _puzzle.item.position === position);
  }

  return (
    <>
      <View style={tw`flex-1 justify-center items-center`}>
        <View style={tw`border-[10px] border-red-500 rounded-lg relative`}>
          <Image
            source={{
              uri: puzzle.image,
            }}
            style={tw`w-90 h-90 border-2 border-gray-200`}
          />
          {Array.from(new Array(row)).map((_, index) => (
            <View key={index} style={tw`absolute top-${index * (90 / row)} left-0 flex-row`}>
              {Array.from(new Array(row)).map((__, index2) => (
                <TouchableOpacity
                  onPress={() => {
                    handleShare(checkHave(index * row + index2 + 1), index, index2);
                  }}
                  key={index2}
                  style={[
                    tw`border-2 border-gray-100 w-[${90 / row}] h-[${90 / row}]`,
                    !checkHave(index * row + index2 + 1) || (index === sindex1 && index2 === sindex2 && black)
                      ? tw`bg-black`
                      : "",
                  ]}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={handleCloseMessage} style={tw``}>
          <View style={tw`bg-white p-4 rounded-lg`}>
            <View style={tw`flex`}>
              <TextInput label="Email" value={text} onChangeText={(_text) => setText(_text)} />
              {searchEmailQuery.isLoading || searchEmailQuery.isFetching ? (
                <Text>Loading...</Text>
              ) : (
                <>
                  {emails.map((email) => (
                    <TouchableOpacity
                      key={email.email}
                      style={tw`flex-row items-center gap-2 mb-2`}
                      onPress={() => {
                        setTimeout(() => {
                          setVisible(false);
                          Toast.show({
                            type: "success",
                            text1: "Share success",
                            text2: `Shared puzzle to ${email.email}`,
                          });
                          setBlack(true);
                        }, 1000);
                      }}
                    >
                      <Image
                        source={{
                          uri: email.avatar || "https://avatar.iran.liara.run/public",
                        }}
                        style={tw`w-10 h-10 rounded-full`}
                      />
                      <Text variant="titleMedium">{email.email}</Text>
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </View>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default PuzzleScreen;
