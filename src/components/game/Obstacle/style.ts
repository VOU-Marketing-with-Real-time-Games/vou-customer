import { StyleSheet } from "react-native";
import { GameStyle } from "../Bird/style";

export const styles = ({ xBody, yBody, widthBody, heightBody, color }: GameStyle) =>
  StyleSheet.create({
    obstacle: {
      position: "absolute",
      left: xBody,
      top: yBody,
      width: widthBody,
      height: heightBody,
      resizeMode: "cover",
    },
  });
