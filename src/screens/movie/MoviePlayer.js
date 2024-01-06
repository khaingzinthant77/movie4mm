import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { useRoute, useTheme } from "@react-navigation/native";
//import icon
import Ionicons from "react-native-vector-icons/Ionicons";
const MoviePlayer = ({ navigation }) => {
  const [videoStatus, setVideoStatus] = useState({});
  const route = new useRoute();
  const { colors } = useTheme();
  const video = React.useRef(null);
  useEffect(() => {
    if (videoStatus?.didJustFinish) {
      video.current.playFromPositionAsync(0);
    }
  }, [videoStatus]);

  go_back = () => {
    videoStatus.isPlaying
      ? video.current.pauseAsync()
      : video.current.playAsync();
    navigation.goBack();
  };

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
      <TouchableOpacity
        onPress={() => go_back()}
        style={{ marginTop: 20, marginBottom: 10, marginLeft: 5 }}
      >
        <Ionicons name="arrow-back" size={30} color={colors.text} />
      </TouchableOpacity>
      <Video
        ref={video}
        source={{
          uri: route.params.url,
        }}
        resizeMode="cover"
        shouldPlay
        goBack
        onFullscreenUpdate={setOrientation}
        useNativeControls
        style={{ width: Dimensions.get("window").width, height: 200 }}
        onPlaybackStatusUpdate={(status) => setVideoStatus(() => status)}
        usePoster={true}
      />
      {/* <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() =>
            videoStatus.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        >
          {videoStatus.isPlaying ? (
            <>
              <AntDesign
                style={styles.icons}
                name="pause"
                size={50}
                color="white"
              />
            </>
          ) : (
            <>
              <AntDesign
                style={styles.icons}
                name="play"
                size={50}
                color="white"
              />
            </>
          )}
        </TouchableOpacity>
      </View> */}
    </View>
  );
};
export default MoviePlayer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
