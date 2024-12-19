import { StyleSheet } from "react-native";

export interface GameStyle {
  xBody: number;
  yBody: number;
  widthBody: number;
  heightBody: number;
  color: string;
}

export const styles = ({ xBody, yBody, widthBody, heightBody, color }: BirdStyle) =>
  StyleSheet.create({
    bird: {
      position: "absolute",
      left: xBody,
      top: yBody,
      width: widthBody,
      height: heightBody,
      resizeMode: "contain",
    },
  });
