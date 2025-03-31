import { TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { Button, Icon, Text, Modal, Portal } from "react-native-paper";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import tw from "../../lib/tailwind";
import { FlappyBirdGameScreenName, QuizGameScreenName, ShakeGameScreenName } from "../../screens/game/game";
import { IGame } from "../../types/game";
import campaignApi from "../../api/campaign.api";

type Props = {
  campaignId: number;
};

const ButtonChooseGame = ({ campaignId }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [games, setGames] = React.useState<IGame[]>([]);

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const getAllGame = useQuery({
    queryKey: ["list-game", campaignId],
    queryFn: async () => {
      const response: IGame[] = await campaignApi.getListGame(campaignId);
      setGames(response);
      return response;
    },
  });

  return (
    <View>
      <Button
        contentStyle={tw`flex-row-reverse items-center`}
        labelStyle={tw`text-xl`}
        mode="contained"
        onPress={showModal}
        disabled={games.length <= 0}
      >
        <View style={tw`flex-row items-center gap-4`}>
          <Text variant="titleLarge" style={tw`text-white ml-20`}>
            Choose game
          </Text>
          <Icon source="gamepad-variant" size={32} color="white" />
        </View>
      </Button>
      {/* modal */}
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={tw`py-10 px-5 bg-white gap-4`}>
          {/* Shake game */}
          {games.map((game) => {
            const { type } = game.gameInfodto;
            if (type === "QUIZZ")
              return (
                <TouchableOpacity
                  key={game.id}
                  onPress={() => {
                    hideModal();
                    navigation.navigate(QuizGameScreenName, {
                      quizzId: game.gameId,
                    });
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
              );
            // gameId
            if (type === "SHAKE_GAME")
              return (
                <TouchableOpacity
                  key={game.id}
                  onPress={() => {
                    hideModal();
                    navigation.navigate(ShakeGameScreenName, { puzzleId: game.gameId });
                  }}
                >
                  <Image
                    source={require("../../../assets/images/game/shake.png")}
                    width={250}
                    height={80}
                    style={[tw`h-22 w-full rounded-xl`]}
                    alt={game.gameInfodto.name}
                  />
                </TouchableOpacity>
              );
            return (
              <TouchableOpacity
                key={game.id}
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
            );
          })}
        </Modal>
      </Portal>
    </View>
  );
};

export default ButtonChooseGame;
