import { Image, Modal, Text, View } from "react-native";
import React from "react";
import { NOTIFICATION_SOCKET } from "@env";
import { useSelector } from "react-redux";
import { Portal } from "react-native-paper";
import { AppState } from "../../store";
import tw from "../../lib/tailwind";

const HandleNotifySocket = () => {
  const [visible, setVisible] = React.useState(false);
  const containerStyle = { backgroundColor: "white", padding: 20, margin: 20, borderRadius: 10 };
  // const [message, setMessage] = React.useState<ISocketMessage | null>(null);
  const user = useSelector((state: AppState) => state.user);

  React.useEffect(() => {
    const ws = new WebSocket(NOTIFICATION_SOCKET);

    ws.onopen = () => {
      // connection opened
      // console.log("WebSocket connection opened");
    };

    ws.onmessage = (e: WebSocketMessageEvent) => {
      // a message was received
      console.log("WebSocket message received notification:", e.data);
      // const recivedMessage = JSON.parse(e.data) as ISocketMessage;
      // // correct user
      // if (recivedMessage && user.email === recivedMessage.email) {
      //   setMessage(recivedMessage);
      //   setVisible(true);
      // }
    };

    ws.onerror = (error: Event) => {
      if ("message" in error) {
        // console.log("WebSocket error:", error.message);
      } else {
        // console.log("WebSocket error occurred");
      }
    };

    ws.onclose = (e) => {
      // connection closed
      // console.log(e.code, e.reason);
    };

    return () => {
      ws.close();
    };
  }, [user.email]);

  const handleCloseMessage = () => {
    setVisible(false);
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={handleCloseMessage}>
        <View style={tw`items-center justify-center gap-2`}>
          {/* <Image source={require("../../assets/images/focus.png")} /> */}
          {/* <Text style={tw`text-[#263238] font-medium text-center`}>{message?.message}</Text> */}
        </View>
      </Modal>
    </Portal>
  );
};

export default HandleNotifySocket;
