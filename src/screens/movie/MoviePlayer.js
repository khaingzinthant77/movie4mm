import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { useRoute, useTheme } from "@react-navigation/native";
const MoviePlayer = () => {
  const route = new useRoute();
  const { colors } = useTheme();
  const setOrientation = () => {
    if (Dimensions.get("window").height > Dimensions.get("window").width) {
      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="auto" />

      <Video
        source={{
          uri: route.params.url,
        }}
        resizeMode="cover"
        shouldPlay
        onFullscreenUpdate={setOrientation}
        useNativeControls
        style={{ width: Dimensions.get("window").width, height: 200 }}
      />
    </View>
  );
};
export default MoviePlayer;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
});
