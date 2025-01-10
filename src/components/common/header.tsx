import React from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, Appbar } from "react-native-paper";

type Props = {
  title: string;
  canGoBack?: boolean;
};

const Header = ({ title, canGoBack = true }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <Appbar.Header>
      {canGoBack && <Appbar.BackAction onPress={() => navigation.goBack()} />}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};
export default Header;
