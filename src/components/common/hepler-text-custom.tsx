import { View } from "react-native";
import React from "react";
import { HelperText } from "react-native-paper";
import tw from "../../lib/tailwind";

interface Props {
  errorText?: string;
}

const HeplerTextCustom = ({ errorText }: Props) => (
  <View style={tw`p-0 m-0 gap-0`}>
    {!!errorText && (
      <HelperText type="error" visible={!!errorText}>
        {errorText}
      </HelperText>
    )}
  </View>
);

export default HeplerTextCustom;
